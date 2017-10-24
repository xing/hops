'use strict';

var fs = require('fs');
var path = require('path');

var ReactApollo = require('react-apollo');

var hopsConfig = require('hops-config');

var common = require('./lib/common');

exports.Context = exports.createContext = common.Context.extend({
  bootstrap: function (enhancedComponent) {
    return ReactApollo.getDataFromTree(enhancedComponent);
  },
  createClient: function (options) {
    options.ssrMode = true;
    return common.Context.prototype.createClient.call(this, options);
  },
  getIntrospectionResult: function () {
    var filePath = path.join(hopsConfig.appDir, 'fragmentTypes.json');
    if (fs.existsSync(filePath)) {
      return require(filePath);
    }
  },
  getTemplateData: function () {
    var templateData = common.Context.prototype.getTemplateData.call(this);
    return Object.assign(templateData, {
      globals: templateData.globals.concat([{
        name: common.INTROSPECTION_RESULT,
        value: this.getIntrospectionResult()
      }])
    });
  }
});
