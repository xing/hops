'use strict';

var ReactApollo = require('react-apollo');

var common = require('./lib/common');
var constants = require('./lib/constants');
var introspectionResult = require('./lib/util').getIntrospectionResult();

module.exports = Object.assign({}, common, {
  enhanceElement: function (reactElement) {
    var enhancedElement = common.enhanceElement.call(this, reactElement);
    return ReactApollo.getDataFromTree(enhancedElement).then(function () {
      return enhancedElement;
    });
  },
  enhanceClientOptions: function (options) {
    return Object.assign(
      common.enhanceClientOptions.call(this, options),
      {
        ssrMode: true
      }
    );
  },
  getIntrospectionResult: function () {
    return introspectionResult;
  },
  getTemplateData: function (templateData) {
    return Object.assign(templateData, {
      globals: templateData.globals.concat([
        {
          name: constants.APOLLO_IQRD,
          value: this.getIntrospectionResult()
        },
        {
          name: constants.APOLLO_STATE,
          value: this.client.cache.extract()
        }
      ])
    });
  }
});
