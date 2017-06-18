'use strict';

var hopsConfig = require('hops-config');
var resolveConfig = require('..').resolve;

function getDefaultResolveConfig (target) {
  var platform = (target === 'render') ? 'server' : 'browser';
  return {
    alias: {
      'hops-entry-point': hopsConfig.appDir
    },
    mainFields: [
      'esnext:' + platform,
      'jsnext:' + platform,
      platform,
      'esnext',
      'jsnext',
      'esnext:main',
      'jsnext:main',
      'module',
      'main'
    ],
    modules: ['node_modules'].concat(hopsConfig.modules),
    extensions: ['.mjs', '.js', '.jsx']
  };
}

module.exports = function getResolveConfig (target) {
  var defaultResolveConfig = getDefaultResolveConfig(target);
  if (typeof resolveConfig === 'function') {
    return resolveConfig(target, defaultResolveConfig);
  }
  if (resolveConfig[target]) {
    return Object.assign({}, defaultResolveConfig, resolveConfig[target]);
  }
  return defaultResolveConfig;
};
