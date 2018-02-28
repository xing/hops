'use strict';

var hopsConfig = require('hops-config');

module.exports = function getResolveConfig(target) {
  var platform = target === 'node' ? 'server' : 'browser';
  return {
    alias: Object.assign(
      {
        'hops-entry-point': hopsConfig.appDir,
      },
      hopsConfig.workerFile && {
        'hops-worker-entry-point': hopsConfig.workerFile,
      }
    ),
    mainFields: [
      'esnext:' + platform,
      'jsnext:' + platform,
      platform,
      'esnext',
      'jsnext',
      'esnext:main',
      'jsnext:main',
      'module',
      'main',
    ],
    modules: ['node_modules'].concat(hopsConfig.moduleDirs),
    extensions: ['.mjs', '.js', '.jsx'],
  };
};
