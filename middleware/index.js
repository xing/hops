'use strict';

var util = require('../lib/util');
var transpile = require('../transpiler');

function createMiddleware (hopsConfig, watchOptions) {
  var config = util.getConfig(hopsConfig);

  var transpiler = transpile(
    require(config.renderConfig),
    watchOptions
  );

  var middleware, error;

  transpiler.on('recompile', function () {
    middleware = null;
    error = null;
  });

  transpiler.on('success', function (result) {
    middleware = result.__esModule ? result.default : result;
    error = null;
  });

  transpiler.on('error', function (result) {
    middleware = null;
    error = result;
  });

  function getMiddlewarePromise () {
    if (error) {
      return Promise.reject(error);
    }
    if (middleware) {
      return Promise.resolve(middleware);
    }
    return new Promise(function (resolve) {
      transpiler.once('result', function () {
        resolve(getMiddlewarePromise());
      });
    });
  }

  return function (req, res, next) {
    getMiddlewarePromise()
    .then(function (middleware) {
      middleware(req, res, next);
    })
    .catch(next);
  };
}

createMiddleware.register = function (hopsConfig, watchOptions) {
  return function (app) {
    var config = util.getConfig(hopsConfig);
    if (config.locations && config.locations.length) {
      var middleware = createMiddleware(config, watchOptions);
      config.locations.forEach(function (location) {
        app.all(location, middleware);
      });
    }
  };
};

module.exports = createMiddleware;
