'use strict';

var util = require('../lib/util');

var promise = util.loadConfig().then(function (config) {
  return util.transpile(require(config.configs.render));
});

module.exports = function (req, res, next) {
  promise.then(function (handle) {
    handle(req, res, next);
  });
};
