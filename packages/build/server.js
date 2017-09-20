'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var hopsBuildConfig = require('hops-build-config');
var createMiddleware = require('hops-middleware');
var server = require('hops-server');

var cleanup = require('./lib/cleanup');

process.on('unhandledRejection', function (error) {
  throw error;
});

function runDevelop (options, callback) {
  var config = require(hopsBuildConfig.developConfig);
  var watchOptions = config.devServer.watchOptions || config.watchOptions;
  var app = new WebpackServer(
    webpack(config),
    Object.assign({}, config.devServer, {
      after: function (app) {
        app.use(server.rewritePath);
        server.bootstrap(app, hopsConfig);
        server.registerMiddleware(app, createMiddleware(
          require(hopsBuildConfig.nodeConfig),
          watchOptions
        ));
        server.teardown(app, hopsConfig);
      },
      watchOptions: watchOptions
    })
  );
  server.run(app, callback);
}

module.exports = function (options, callback) {
  if (options.clean) {
    var dirs = [hopsConfig.buildDir, hopsConfig.cacheDir];
    return cleanup(dirs).then(runDevelop.bind(null, options, callback));
  } else {
    return runDevelop(options, callback);
  }
};
