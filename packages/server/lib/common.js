'use strict';

var url = require('url');

var hopsEnv = require('hops-env');

exports.rewritePath = function rewritePath (req, res, next) {
  var location = hopsEnv.locations.find(function (location) {
    return (location !== '/' && req.url.indexOf(location) === 0);
  });
  if (location) {
    req.url = location.replace(/([^\\/])$/, '$1/');
  }
  next();
};

exports.registerMiddleware = function registerMiddleware (app, middleware) {
  if (hopsEnv.locations.length) {
    hopsEnv.locations.forEach(function (location) {
      app.get(location === '/' ? location : location + '*', middleware);
    });
  } else {
    app.all('*', middleware);
  }
};

exports.run = function run (app) {
  app.listen(hopsEnv.port, hopsEnv.host, function (error) {
    if (error) {
      console.error(error.stack.toString());
    } else {
      console.log('hops server listening at ' + url.format({
        protocol: hopsEnv.https ? 'https' : 'http',
        hostname: hopsEnv.host,
        port: hopsEnv.port
      }));
    }
  });
};

exports.bootstrap = hopsEnv.bootstrapServer || function () {};

exports.teardown = hopsEnv.teardownServer || function () {};
