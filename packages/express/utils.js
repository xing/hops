'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var https = require('https');

var hopsConfig = require('hops-config');

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
        hopsConfig.keyFile || path.join(__dirname, 'ssl', 'localhost.ssl.key')
      ),
      cert: fs.readFileSync(
        hopsConfig.certFile || path.join(__dirname, 'ssl', 'localhost.ssl.crt')
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

exports.bootstrap = hopsConfig.bootstrapServer || function() {};

exports.teardown = hopsConfig.teardownServer || function() {};
