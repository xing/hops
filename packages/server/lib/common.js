'use strict';

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
