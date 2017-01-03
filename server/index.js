'use strict';

var util = require('../lib/util');

var promise = util.loadConfig().then(function (config) {
  return util.transpile(require(config.configs.render));
});

module.exports = function (req, res, next) {
  promise.then(function (handle) {
    // eslint-disable-next-line no-underscore-dangle
    if (handle.__esModule) {
      handle = handle.default;
    }
    handle(req, res, next);
  });
};
