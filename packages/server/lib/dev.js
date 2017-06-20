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
        hopsConfig.bootstrap(app);
        app.use(common.rewritePath);
        common.registerMiddleware(app, createMiddleware(
          require(hopsConfig.renderConfig),
          developConfig.watchOptions
        ));
        hopsConfig.teardown(app);
      },
      watchOptions: developConfig.watchOptions
    })
  );
  app.listen(hopsConfig.port, hopsConfig.host, function (error) {
    if (error) {
      console.error(error.stack.toString());
    } else {
      console.log('development server listening at ' + hopsConfig.address);
    }
  });
};
