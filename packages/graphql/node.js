'use strict';

var ReactApollo = require('react-apollo');

var common = require('./lib/common');
var introspectionResult = require('./lib/util').getIntrospectionResult();

exports.Context = exports.createContext = common.Context.mixin({
  enhanceElement: function (reactElement) {
    return ReactApollo.getDataFromTree(reactElement).then(function () {
      return reactElement;
    });
  },
  enhanceClientOptions: function (options) {
    return Object.assign(
      options,
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
          name: common.APOLLO_IQRD,
          value: this.getIntrospectionResult()
        },
        {
          name: common.APOLLO_STATE,
          value: this.client.cache.extract()
        }
      ])
    });
  }
});
