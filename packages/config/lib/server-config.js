'use strict';

var hopsRoot = require('hops-root');
var createMiddleware = require('hops-middleware');

var hopsConfig = require('..');
var devServerConfig = hopsConfig.devServer;

var watchOptions = {
  aggregateTimeout: 300,
  ignored: /node_modules/
};

var defaultDevServerConfig = {
  contentBase: hopsRoot.resolve(hopsConfig.buildDir),
  hot: true,
  overlay: {
    warnings: true,
    errors: true
  },
  stats: 'errors-only',
  watchOptions: watchOptions,
  setup: function (app) {
    var webpackConfig = require(hopsConfig.renderConfig);
    var middleware = createMiddleware(webpackConfig, watchOptions);
    if (hopsConfig.locations.length) {
      app.use(function (req, res, next) {
        for (var i = 0; i < hopsConfig.locations.length; i++) {
          var location = hopsConfig.locations[i];
          if (location !== '/' && req.url.indexOf(location) === 0) {
            req.url = location;
            break;
          }
        }
        next();
      });
      hopsConfig.locations.forEach(function (location) {
        app.get(location === '/' ? location : location + '*', middleware);
      });
    } else {
      app.all('*', middleware);
    }
  }
};

module.exports = function () {
  if (typeof devServerConfig === 'function') {
    return devServerConfig(defaultDevServerConfig);
  }
  return Object.assign({}, defaultDevServerConfig, devServerConfig);
};
