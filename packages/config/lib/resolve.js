'use strict';

var hopsRoot = require('hops-root');

module.exports = function getResolve (platform) {
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
};
