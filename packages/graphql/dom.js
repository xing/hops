'use strict';

var hopsReact = require('hops-react');

var common = require('./lib/common');
var constants = require('./lib/constants');

exports.GraphQLContext = function() {
  return common.constructor.apply(this, arguments);
};
exports.GraphQLContext.prototype = Object.assign({}, common, {
  createCache: function() {
    return common.createCache
      .call(this)
      .restore(global[constants.APOLLO_STATE]);
  },
  getIntrospectionResult: function() {
    return global[constants.APOLLO_IQRD];
  },
});

exports.contextDefinition = exports.GraphQLContext;

exports.createContext = hopsReact.combineContexts(
  hopsReact.ReactContext,
  exports.GraphQLContext
);
