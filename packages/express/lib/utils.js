'use strict';

var fs = require('fs');
var url = require('url');
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

function defaultCallback(error) {
  if (error) {
    console.error(error.stack.toString());
  } else {
    console.log(
      'hops: Server listening at ' +
        url.format({
          protocol: hopsConfig.https ? 'https' : 'http',
          hostname:
            hopsConfig.host === '0.0.0.0' ? 'localhost' : hopsConfig.host,
          port: hopsConfig.port,
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
  server.listen(hopsConfig.port, hopsConfig.host, function(error) {
    (callback || defaultCallback)(error, server);
  });
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
    stats:
      res.locals && res.locals.webpackStats
        ? res.locals.webpackStats.toJson()
        : getStatsFromFile(),
  };
  res.locals.hops.assets = { js: [], css: [] };
  var assets = res.locals.hops.stats.assetsByChunkName;
  if (assets) {
    ['vendor', 'main'].forEach(function(key) {
      var asset = assets[key];
      if (Array.isArray(asset)) {
        var js = asset.find(function(item) {
          return item.indexOf('.js') === item.length - 3;
        });
        js && res.locals.hops.assets.js.push('/' + js);
        var css = asset.find(function(item) {
          return item.indexOf('.css') === item.length - 4;
        });
        css && res.locals.hops.assets.css.push('/' + css);
      } else if (asset) {
        res.locals.hops.assets.js.push('/' + asset);
      }
    });
  }
  next();
};

exports.bootstrap = hopsConfig.bootstrapServer || function() {};

exports.teardown = hopsConfig.teardownServer || function() {};
