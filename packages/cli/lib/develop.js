'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var webpackConfig = require(hopsConfig.developConfig);

var util = require('./util');

module.exports = function runDevelop (port) {
  var serverConfig = Object.assign(
    { host: '0.0.0.0', port: port || 8080 },
    webpackConfig.devServer
  );
  var server = new WebpackServer(
    webpack(webpackConfig),
    serverConfig
  );
  server.listen(
    serverConfig.port,
    serverConfig.host,
    function (error) {
      if (error) {
        util.logError(error.stack.toString());
      } else {
        util.logInfo('development server listening');
      }
    }
  );
};
