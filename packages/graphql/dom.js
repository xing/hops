'use strict';

var common = require('./lib/common');
var constants = require('./lib/constants');

module.exports = Object.assign({}, common, {
  createCache: function () {
    return common.createCache.call(this).restore(
      global[constants.APOLLO_STATE]
    );
  },
  getIntrospectionResult: function () {
    return global[constants.APOLLO_IQRD];
  }
});
