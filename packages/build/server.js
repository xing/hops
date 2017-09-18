'use strict';

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var hopsConfig = require('hops-config');
var createMiddleware = require('hops-middleware');

var server = require('hops-server');

process.on('unhandledRejection', function (error) {
  throw error;
});

module.exports = function runDevelop (options, callback) {
  var config = require(hopsConfig.developConfig);
  var watchOptions = config.devServer.watchOptions || config.watchOptions;
  var app = new WebpackServer(
    webpack(config),
    Object.assign({}, config.devServer, {
      after: function (app) {
        app.use(server.rewritePath);
        server.bootstrap(app, hopsConfig);
        server.registerMiddleware(app, createMiddleware(
          require(hopsConfig.nodeConfig),
          watchOptions
        ));
        server.teardown(app, hopsConfig);
      },
      watchOptions: watchOptions
    })
  );
  server.run(app, callback);
};
