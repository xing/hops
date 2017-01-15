'use strict';

var util = require('../lib/util');
var transpile = require('../transpiler');


module.exports = function createMiddleware(hopsConfig, watchOptions) {
  var middlewarePromise = null;
  var transpilerPromise = util.loadConfig(hopsConfig).then(function (config) {
    var transpiler = transpile(require(config.webpack.render), watchOptions);
    transpiler.on('start', function () {
      middlewarePromise = null;
    });
    return transpiler;
  });

  function getMiddlewarePromise() {
    if (middlewarePromise) {
      return middlewarePromise;
    }
    else {
      return transpilerPromise.then(function (transpiler) {
        return new Promise(function (resolve, reject) {
          transpiler.on('success', function (result) {
            middlewarePromise = Promise.resolve(util.getDefaultExport(result));
            resolve(middlewarePromise);
          });
          transpiler.on('error', reject);
        });
      });
    }
  }

  return function (req, res, next) {
    getMiddlewarePromise().then(function (middleware) {
      middleware(req, res, next);
    })
    .catch(util.logError);
  };
};
