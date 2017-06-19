'use strict';

var createMiddleware = require('hops-middleware');

var hopsConfig = require('..');
var devServerConfig = hopsConfig.devServer;

function rewritePath (req, res, next) {
  for (var i = 0; i < hopsConfig.locations.length; i++) {
    var location = hopsConfig.locations[i];
    if (location !== '/' && req.url.indexOf(location) === 0) {
      req.url = location.replace(/([^\\/])$/, '$1/');
      break;
    }
  }
  next();
}

function registerMiddleware (app, middleware) {
  hopsConfig.bootstrap(app);
  if (hopsConfig.locations.length) {
    hopsConfig.locations.forEach(function (location) {
      app.get(location === '/' ? location : location + '*', middleware);
    });
  } else {
    app.all('*', middleware);
  }
  hopsConfig.teardown(app);
}

function getDefaultDevServerConfig (watchOptions) {
  return {
    contentBase: hopsConfig.buildDir,
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
      app.use(rewritePath);
      registerMiddleware(app, middleware);
    }
  };
}

module.exports = function getServerConfig (watchOptions) {
  var defaultDevServerConfig = getDefaultDevServerConfig(watchOptions);
  if (typeof devServerConfig === 'function') {
    return devServerConfig(defaultDevServerConfig);
  }
  return Object.assign({}, defaultDevServerConfig, devServerConfig);
};

module.exports.registerMiddleware = registerMiddleware;

module.exports.rewritePath = rewritePath;
