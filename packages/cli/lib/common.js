'use strict';

var url = require('url');

var hopsConfig = require('hops-config');

var hopsLocations = hopsConfig.locations.map(function (location) {
  return hopsConfig.basePath + location;
});

function defaultCallback (error) {
  if (error) {
    console.error(error.stack.toString());
  } else {
    console.log('hops server listening at ' + url.format({
      protocol: hopsConfig.https ? 'https' : 'http',
      hostname: hopsConfig.host,
      port: hopsConfig.port
    }));
  }
}

exports.run = function run (app, callback) {
  app.listen(hopsConfig.port, hopsConfig.host, callback || defaultCallback);
};

exports.rewritePath = function rewritePath (req, res, next) {
  var location = hopsLocations.find(function (location) {
    return (
      location !== hopsConfig.basePath + '/' &&
      req.url.indexOf(location) === 0
    );
  });
  if (location) {
    req.url = location.replace(/([^\\/])$/, '$1/');
  }
  next();
};

exports.registerMiddleware = function registerMiddleware (app, middleware) {
  if (hopsLocations.length) {
    hopsLocations.forEach(function (location) {
      app.get(location === '/' ? location : location + '*', middleware);
    });
  } else {
    app.all('*', middleware);
  }
};

exports.bootstrap = hopsConfig.bootstrapServer || function () {};

exports.teardown = hopsConfig.teardownServer || function () {};
