'use strict';

var util = require('../lib/util');
var transpile = require('../transpiler');

function createMiddleware (hopsConfig, watchOptions) {
  var config = util.getConfig(hopsConfig);

  var transpilerPromise = null;
  var middlewarePromise = null;

  var transpiler = transpile(require(config.webpack.render), watchOptions);

  transpiler.on('recompile', function () {
    middlewarePromise = null;
  });

  function getTranspilerPromise () {
    return new Promise(function (resolve, reject) {
      transpiler.on('success', function (result) {
        transpilerPromise = null;
        middlewarePromise = Promise.resolve(
          result.__esModule ? result.default : result
        );
        resolve(middlewarePromise);
      });
      transpiler.on('error', reject);
    });
  }

  function getMiddlewarePromise () {
    return middlewarePromise || transpilerPromise || getTranspilerPromise();
  }

  transpilerPromise = getTranspilerPromise().catch(util.logError);

  return function (req, res, next) {
    getMiddlewarePromise()
    .then(function (middleware) {
      middleware(req, res, next);
    })
    .catch(function (error) {
      util.logError(error);
      if (hopsConfig.onError) {
        hopsConfig.onError(req, res, next);
      } else {
        res.writeHead(500);
        res.write('<h1>Server Error</h1>');
        res.end();
      }
    });
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

