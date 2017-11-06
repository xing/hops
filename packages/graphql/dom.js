'use strict';

var common = require('./lib/common');

exports.Context = exports.createContext = common.Context.mixin({
  createCache: function () {
    return common.Context.prototype.createCache.call(this).restore(
      global[common.APOLLO_STATE]
    );
  },
  getIntrospectionResult: function () {
    return global[common.APOLLO_IQRD];
  }
});
