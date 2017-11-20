'use strict';

var ReactApollo = require('react-apollo');

var common = require('./lib/common');
var introspectionResult = require('./lib/util').getIntrospectionResult();

exports.Context = exports.createContext = common.Context.extend({
  prepareRender: function (enhancedElement) {
    return ReactApollo.getDataFromTree(enhancedElement);
  },
  createClient: function (options) {
    options.ssrMode = true;
    return common.Context.prototype.createClient.call(this, options);
  },
  getIntrospectionResult: function () {
    return introspectionResult;
  },
  getTemplateData: function () {
    var templateData = common.Context.prototype.getTemplateData.call(this);
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
