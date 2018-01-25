'use strict';

var express = require('express');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var hopsConfig = require('hops-config');
var hopsBuildConfig = require('hops-build-config');
var hopsExpressUtils = require('hops-express').utils;

var createMiddleware = require('./middleware');
var cleanup = require('./cleanup');

var developConfig = hopsBuildConfig.develop;
var nodeConfig = hopsBuildConfig.node;

process.on('unhandledRejection', function(error) {
  throw error;
});

function runDevelop(options, callback) {
  var compiler = webpack(developConfig);
  var app = express();
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      logLevel: 'warn',
      publicPath: developConfig.output.publicPath,
      watchOptions: developConfig.watchOptions,
    })
  );
  app.use(webpackHotMiddleware(compiler));
  app.use(hopsExpressUtils.rewritePath);
  app.use(express.static(hopsConfig.buildDir, { redirect: false }));
  hopsExpressUtils.bootstrap(app, hopsConfig);
  hopsExpressUtils.registerMiddleware(
    app,
    createMiddleware(nodeConfig, developConfig.watchOptions)
  );
  hopsExpressUtils.teardown(app, hopsConfig);
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
