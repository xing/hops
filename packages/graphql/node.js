'use strict';

var ReactApollo = require('react-apollo');

var hopsReact = require('hops-react');

var common = require('./lib/common');
var constants = require('./lib/constants');
var introspectionResult = require('./lib/util').getIntrospectionResult();

exports.GraphQLContext = function() {
  return common.constructor.apply(this, arguments);
};
exports.GraphQLContext.prototype = Object.assign({}, common, {
  enhanceClientOptions: function(options) {
    return Object.assign(common.enhanceClientOptions.call(this, options), {
      ssrMode: true,
    });
  },
  getIntrospectionResult: function() {
    return introspectionResult;
  },
  getTemplateData: function(templateData, rootElement) {
    return ReactApollo.getDataFromTree(rootElement).then(
      function() {
        return Object.assign({}, templateData, {
          globals: (templateData.globals || []).concat([
            {
              name: constants.APOLLO_IQRD,
              value: this.getIntrospectionResult(),
            },
            {
              name: constants.APOLLO_STATE,
              value: this.client.cache.extract(),
            },
          ]),
        });
      }.bind(this)
    );
  },
});

exports.contextDefinition = exports.GraphQLContext;

exports.createContext = hopsReact.combineContexts(
  hopsReact.ReactContext,
  exports.GraphQLContext
);
