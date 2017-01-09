'use strict';

var util = require('../lib/util');
var transpiler = require('../transpiler');


exports.createMiddleware = function createMiddleware(defaultConfig) {
  var configPromise = util.loadConfig(defaultConfig).then(function (config) {
    return transpiler.transpileOnce(require(config.webpack.render));
  });
  return function (req, res, next) {
    configPromise.then(function (handle) {
      // eslint-disable-next-line no-underscore-dangle
      if (handle.__esModule) {
        handle = handle.default;
      }
      handle(req, res, next);
    })
    .catch(util.logError);
  };
};
