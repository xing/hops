'use strict';

var hopsConfig = require('..');
var devServerConfig = hopsConfig.devServer;

var defaultDevServerConfig = {
  contentBase: hopsConfig.buildDir,
  hot: true,
  overlay: {
    warnings: true,
    errors: true
  },
  stats: 'errors-only'
};

module.exports = function getServerConfig () {
  if (typeof devServerConfig === 'function') {
    return devServerConfig(defaultDevServerConfig);
  }
  return Object.assign({}, defaultDevServerConfig, devServerConfig);
};
