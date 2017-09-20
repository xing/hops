'use strict';

var hopsConfig = require('hops-config');

module.exports = function getResolveConfig (target) {
  var platform = (target === 'node') ? 'server' : 'browser';
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
    modules: ['node_modules'].concat(hopsConfig.moduleDirs),
    extensions: ['.mjs', '.js', '.jsx']
  };
};
