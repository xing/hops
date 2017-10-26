'use strict';

var fs = require('fs');

var ReactApollo = require('react-apollo');

var common = require('./lib/common');
var fragmentsFile = require('./lib/util').getFragmentsFile();

exports.Context = exports.createContext = common.Context.extend({
  prepareEnhancedElement: function (enhancedComponent) {
    return ReactApollo.getDataFromTree(enhancedComponent);
  },
  createClient: function (options) {
    options.ssrMode = true;
    return common.Context.prototype.createClient.call(this, options);
  },
  getIntrospectionResult: function () {
    if (fs.existsSync(fragmentsFile)) {
      return require(fragmentsFile);
    }
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
