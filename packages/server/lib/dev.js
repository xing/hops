'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsEnv = require('hops-env');
var createMiddleware = require('hops-middleware');

var common = require('./common');

module.exports = function () {
  var config = require(hopsEnv.developConfig);
  var watchOptions = config.devServer.watchOptions || config.watchOptions;
  var app = new WebpackServer(
    webpack(config),
    Object.assign({}, config.devServer, {
      setup: function (app) {
        app.use(common.rewritePath);
        common.bootstrap(app);
        common.registerMiddleware(app, createMiddleware(
          require(hopsEnv.nodeConfig),
          watchOptions
        ));
        common.teardown(app);
      },
      watchOptions: watchOptions
    })
  );
  common.run(app);
};
