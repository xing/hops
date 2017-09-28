'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var createMiddleware = require('hops-middleware');

var common = require('../lib/common');

process.on('unhandledRejection', function (error) {
  throw error;
});

module.exports = function runDevelop (program, callback) {
  var config = require(hopsConfig.developConfig);
  var watchOptions = config.devServer.watchOptions || config.watchOptions;
  var app = new WebpackServer(
    webpack(config),
    Object.assign({}, config.devServer, {
      after: function (app) {
        app.use(common.rewritePath);
        common.bootstrap(app, hopsConfig);
        common.registerMiddleware(app, createMiddleware(
          require(hopsConfig.nodeConfig),
          watchOptions
        ));
        common.teardown(app, hopsConfig);
      },
      watchOptions: watchOptions
    })
  );
  common.run(app, callback);
};
