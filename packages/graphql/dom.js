'use strict';

var hopsReact = require('hops-react');

var common = require('./lib/common');
var constants = require('./lib/constants');

exports.mixin = Object.assign({}, common, {
  createCache: function () {
    return common.createCache.call(this).restore(
      global[constants.APOLLO_STATE]
    );
  },
  getIntrospectionResult: function () {
    return global[constants.APOLLO_IQRD];
  }
});

exports.createContext = hopsReact.createContext.mixin(exports.mixin);
