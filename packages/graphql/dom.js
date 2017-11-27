'use strict';

var hopsReact = require('hops-react');

var common = require('./lib/common');
var constants = require('./lib/constants');

exports.contextDefinition = function () {
  return common.constructor.apply(this, arguments);
};

exports.contextDefinition.prototype = Object.assign({}, common, {
  createCache: function () {
    return common.createCache.call(this).restore(
      global[constants.APOLLO_STATE]
    );
  },
  getIntrospectionResult: function () {
    return global[constants.APOLLO_IQRD];
  }
});

exports.createContext = hopsReact.combineContexts(
  hopsReact.contextDefinition,
  exports.contextDefinition
);
