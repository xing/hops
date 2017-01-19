'use strict';

var util = require('../lib/util');
var transpile = require('../transpiler');


module.exports = function createMiddleware(hopsConfig, watchOptions) {
  var config = util.getConfig(hopsConfig);

  var transpilerPromise = null;
  var middlewarePromise = null;

  var transpiler = transpile(require(config.webpack.render), watchOptions);

  transpiler.on('recompile', function () {
    middlewarePromise = null;
  });

  function getTranspilerPromise() {
    return new Promise(function (resolve, reject) {
      transpiler.on('success', function (result) {
        transpilerPromise = null;
        middlewarePromise = Promise.resolve(util.getDefaultExport(result));
        resolve(middlewarePromise);
      });
      transpiler.on('error', reject);
    });
  }

  function getMiddlewarePromise() {
    return middlewarePromise || transpilerPromise || getTranspilerPromise();
  }

  transpilerPromise = getTranspilerPromise().catch(util.logError);

  return function (req, res, next) {
    getMiddlewarePromise().then(function (middleware) {
      middleware(req, res, next);
    })
    .catch(util.logError);
  };
};
