'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var createMiddleware = require('hops-middleware');

var common = require('../lib/common');

module.exports = function (program) {
  var config = require(hopsConfig.developConfig);
  var watchOptions = config.devServer.watchOptions || config.watchOptions;
  var app = new WebpackServer(
    webpack(config),
    Object.assign({}, config.devServer, {
      setup: function (app) {
        app.use(common.rewritePath);
        common.bootstrap(app);
        common.registerMiddleware(app, createMiddleware(
          require(hopsConfig.nodeConfig),
          watchOptions
        ));
        common.teardown(app);
      },
      watchOptions: watchOptions
    })
  );
  common.run(app);
};
