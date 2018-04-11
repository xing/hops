'use strict';

var fs = require('fs');
var url = require('url');
var net = require('net');
var path = require('path');
var http = require('http');
var https = require('https');

var hopsConfig = require('hops-config');

var stats;
function getStatsFromFile() {
  if (!stats) {
    var statsFilename = path.join(hopsConfig.buildDir, 'stats.json');
    if (fs.existsSync(statsFilename)) {
      stats = require(statsFilename);
    }
  }
  return stats || {};
}

function getPort(host, port, max) {
  return new Promise(function(resolve, reject) {
    max = max || Math.min(65535, port + 50);
    if (port > max) {
      return reject(new Error('unable to find free port'));
    }
    var server = net.createServer();
    server.on('error', function() {
      resolve(getPort(host, port + 1, max));
      server.close();
    });
    server.listen(port, host, function() {
      server.once('close', function() {
        resolve(port);
      });
      server.close();
    });
  });
}

function defaultCallback(error, server) {
  if (error) {
    console.error(error.stack ? error.stack.toString() : error.toString());
  } else {
    var address = server.address();
    console.log(
      'hops: Server listening at ' +
        url.format({
          protocol: hopsConfig.https ? 'https' : 'http',
          hostname:
            address.address === '0.0.0.0' ? 'localhost' : address.address,
          port: address.port,
          pathname: hopsConfig.basePath,
        })
    );
  }
}

exports.run = function run(app, callback) {
  var server;
  if (hopsConfig.https) {
    var options = {
      key: fs.readFileSync(
        hopsConfig.keyFile ||
          path.resolve(path.join(__dirname, '..', 'ssl', 'localhost.ssl.key'))
      ),
      cert: fs.readFileSync(
        hopsConfig.certFile ||
          path.resolve(path.join(__dirname, '..', 'ssl', 'localhost.ssl.crt'))
      ),
    };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }
  function listen(port) {
    server.listen(port || hopsConfig.port, hopsConfig.host, function(error) {
      (callback || defaultCallback)(error, server);
    });
  }
  if (hopsConfig.port) {
    listen();
  } else {
    getPort(hopsConfig.host, 8080)
      .then(listen)
      .catch(defaultCallback);
  }
};

exports.rewritePath = function rewritePath(req, res, next) {
  if (
    process.env.HOPS_MODE === 'static' &&
    Array.isArray(hopsConfig.locations)
  ) {
    var location = hopsConfig.locations.find(function(location) {
      return (
        location !== hopsConfig.basePath + '/' &&
        req.url.indexOf(location) === 0
      );
    });
    if (location) {
      req.url = location.replace(/([^\\/])$/, '$1/');
    }
  }
  next();
};

exports.registerMiddleware = function registerMiddleware(app, middleware) {
  app.use(exports.assetsMiddleware);
  if (
    process.env.HOPS_MODE === 'static' &&
    Array.isArray(hopsConfig.locations)
  ) {
    hopsConfig.locations.forEach(function(location) {
      app.get(location === '/' ? location : location + '*', middleware);
    });
  } else {
    app.all('*', middleware);
  }
};

exports.assetsMiddleware = function assetsMiddleware(req, res, next) {
  res.locals = res.locals || {};
  res.locals.hops = {
    stats: res.locals.webpackStats
      ? res.locals.webpackStats.toJson()
      : getStatsFromFile(),
  };
  var entrypoints = res.locals.hops.stats.entrypoints || {};
  var assets = Object.keys(entrypoints).reduce(function(allAssets, name) {
    return allAssets.concat(entrypoints[name].assets || []);
  }, []);

  res.locals.hops.assets = assets.reduce(
    function(byType, asset) {
      var type = path.extname(asset).slice(1);
      byType[type] = (byType[type] || []).concat(asset);
      return byType;
    },
    { js: [], css: [] }
  );

  next();
};

exports.timings = hopsConfig.enableServerTimings
  ? require('server-timings')
  : function(req, res, next) {
      res.locals.timings = { start: function() {}, end: function() {} };
      next();
    };

exports.bootstrap = hopsConfig.bootstrapServer || function() {};

exports.teardown = hopsConfig.teardownServer || function() {};
