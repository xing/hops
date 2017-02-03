'use strict';

var util = require('../lib/util');
var createMiddleware = require('.');

module.exports = function createDevServerSetup (hopsConfig, watchOptions) {
  return function (app) {
    var config = util.getConfig(hopsConfig);
    if (config.locations && config.locations.length) {
      var webpackConfig = require(config.renderConfig);
      var middleware = createMiddleware(webpackConfig, watchOptions);
      config.locations.forEach(function (location) {
        app.all(location, middleware);
      });
    }
  };
};
