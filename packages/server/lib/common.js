'use strict';

var url = require('url');

var hopsConfig = require('hops-config');

exports.rewritePath = function rewritePath (req, res, next) {
  var location = hopsConfig.locations.find(function (location) {
    return (location !== '/' && req.url.indexOf(location) === 0);
  });
  if (location) {
    req.url = location.replace(/([^\\/])$/, '$1/');
  }
  next();
};

exports.registerMiddleware = function registerMiddleware (app, middleware) {
  if (hopsConfig.locations.length) {
    hopsConfig.locations.forEach(function (location) {
      app.get(location === '/' ? location : location + '*', middleware);
    });
  } else {
    app.all('*', middleware);
  }
};

exports.runServer = function runServer (app) {
  app.listen(hopsConfig.port, hopsConfig.host, function (error) {
    if (error) {
      console.error(error.stack.toString());
    } else {
      console.log('hops server listening at ' + url.format({
        protocol: hopsConfig.https ? 'https' : 'http',
        hostname: hopsConfig.host,
        port: hopsConfig.port
      }));
    }
  });
};
