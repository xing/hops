'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');
var WebpackServer = require('webpack-dev-server');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var hopsConfig = require('hops-config');
var hopsBuildConfig = require('hops-build-config');
var createMiddleware = require('hops-middleware');
var utils = require('hops-express').utils;

var mergeWithPlugins = merge.strategy({ plugins: 'append' });

function injectCleanPlugin(webpackConfig) {
  var dirs = [hopsConfig.buildDir, hopsConfig.cacheDir];
  return mergeWithPlugins(webpackConfig, {
    plugins: [
      new CleanWebpackPlugin(dirs, {
        root: hopsConfig.appDir,
      }),
    ],
  });
}

process.on('unhandledRejection', function(error) {
  throw error;
});

function runDevelop(options, callback) {
  var config = require(hopsBuildConfig.developConfig);
  var watchOptions = config.devServer.watchOptions || config.watchOptions;
  var app = new WebpackServer(
    webpack(options.clean ? injectCleanPlugin(config) : config),
    Object.assign(
      {},
      {
        after: function(app) {
          app.use(utils.rewritePath);
          utils.bootstrap(app, hopsConfig);
          utils.registerMiddleware(
            app,
            createMiddleware(require(hopsBuildConfig.nodeConfig), watchOptions)
          );
          utils.teardown(app, hopsConfig);
        },
        watchOptions: watchOptions,
      },
      config.devServer
    )
  );
  utils.run(app, callback);
}

module.exports = function(options, callback) {
  return runDevelop(options, callback);
};
