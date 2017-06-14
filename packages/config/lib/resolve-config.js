'use strict';

var hopsRoot = require('hops-root');
var resolveConfig = require('..').resolve;

function getDefaultResolveConfig (target) {
  var platform = (target === 'render') ? 'server' : 'browser';
  return {
    alias: {
      'hops-entry-point': hopsRoot.toString()
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
    modules: [
      'node_modules',
      hopsRoot.resolve('packages')
    ],
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
