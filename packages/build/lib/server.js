'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var hopsBuildConfig = require('hops-build-config');
var hopsExpressUtils = require('hops-express').utils;

var createMiddleware = require('./middleware');
var cleanup = require('./cleanup');

process.on('unhandledRejection', function(error) {
  throw error;
});

function runDevelop(options, callback) {
  var config = require(hopsBuildConfig.developConfig);
  var watchOptions = config.devServer.watchOptions || config.watchOptions;
  var app = new WebpackServer(
    webpack(config),
    Object.assign(
      {},
      {
        after: function(app) {
          app.use(hopsExpressUtils.rewritePath);
          hopsExpressUtils.bootstrap(app, hopsConfig);
          hopsExpressUtils.registerMiddleware(
            app,
            createMiddleware(require(hopsBuildConfig.nodeConfig), watchOptions)
          );
          hopsExpressUtils.teardown(app, hopsConfig);
        },
        watchOptions: watchOptions,
      },
      config.devServer
    )
  );
  hopsExpressUtils.run(app, callback);
}

module.exports = function(options, callback) {
  if (options.clean) {
    var dirs = [hopsConfig.buildDir, hopsConfig.cacheDir];
    return cleanup(dirs).then(runDevelop.bind(null, options, callback));
  } else {
    return runDevelop(options, callback);
  }
};
