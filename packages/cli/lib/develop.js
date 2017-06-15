'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var webpackConfig = require(hopsConfig.developConfig);

var util = require('./util');

module.exports = function runDevelop () {
  var server = new WebpackServer(
    webpack(webpackConfig),
    webpackConfig.devServer
  );
  server.listen(
    hopsConfig.port,
    hopsConfig.host,
    function (error) {
      if (error) {
        util.logError(error.stack.toString());
      } else {
        util.logInfo('development server listening at ' + hopsConfig.address);
      }
    }
  );
};
