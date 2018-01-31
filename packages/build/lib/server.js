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

process.on('unhandledRejection', function(error) {
  throw error;
});

function runDevelop(options, callback) {
  var config = require(hopsBuildConfig.developConfig);
  var compiler = webpack(config);
  var app = express();
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      logLevel: 'warn',
      publicPath: config.output.publicPath,
      watchOptions: config.watchOptions,
      serverSideRender: true,
    })
  );
  app.use(webpackHotMiddleware(compiler));
  app.use(hopsExpressUtils.rewritePath);
  app.use(express.static(hopsConfig.buildDir, { redirect: false }));
  hopsExpressUtils.bootstrap(app, hopsConfig);
  hopsExpressUtils.registerMiddleware(
    app,
    createMiddleware(require(hopsBuildConfig.nodeConfig), config.watchOptions)
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
