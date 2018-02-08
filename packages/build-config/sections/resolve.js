'use strict';

var hopsConfig = require('hops-config');

module.exports = function getResolveConfig(target) {
  var platform = target === 'node' ? 'server' : 'browser';
  return {
    alias: {
      'hops-entry-point': hopsConfig.appDir,
      'hops-worker-entry-point':
        typeof hopsConfig.workerFile === 'boolean'
          ? require.resolve('../lib/worker')
          : hopsConfig.workerFile,
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
      'main',
    ],
    modules: ['node_modules'].concat(hopsConfig.moduleDirs),
    extensions: ['.mjs', '.js', '.jsx'],
  };
};
