'use strict';

var transpile = require('./transpile');

module.exports = function createMiddleware(webpackConfig, watchOptions) {
  var transpiler = transpile(webpackConfig, watchOptions);

  var middleware, error;

  transpiler.on('start', function() {
    middleware = null;
    error = null;
  });

  transpiler.on('success', function(result) {
    middleware = result;
    error = null;
  });

  transpiler.on('error', function(result) {
    middleware = null;
    error = result;
  });

  function getMiddlewarePromise() {
    if (error) {
      return Promise.reject(error);
    }
    if (middleware) {
      return Promise.resolve(middleware);
    }
    return new Promise(function(resolve) {
      transpiler.once('result', function() {
        resolve(getMiddlewarePromise());
      });
    });
  }

  return function(req, res, next) {
    getMiddlewarePromise()
      .then(function(middleware) {
        middleware(req, res, next);
      })
      .catch(next);
  };
};
