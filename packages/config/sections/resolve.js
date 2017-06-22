'use strict';

var hopsEnv = require('hops-env');

module.exports = function getResolveConfig (target) {
  var platform = (target === 'node') ? 'server' : 'browser';
  return {
    alias: {
      'hops-entry-point': hopsEnv.appDir
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
    modules: ['node_modules'].concat(hopsEnv.moduleDirs),
    extensions: ['.mjs', '.js', '.jsx']
  };
};
