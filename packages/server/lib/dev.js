'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var createMiddleware = require('hops-middleware');

var common = require('./common');

module.exports = function () {
  var developConfig = require(hopsConfig.developConfig);
  var app = new WebpackServer(
    webpack(developConfig),
    Object.assign({}, developConfig.devServer, {
      setup: function (app) {
        app.use(common.rewritePath);
        hopsConfig.bootstrap(app);
        common.registerMiddleware(app, createMiddleware(
          require(hopsConfig.nodeConfig),
          developConfig.watchOptions
        ));
        hopsConfig.teardown(app);
      },
      watchOptions: developConfig.watchOptions
    })
  );
  common.runServer(app);
};
