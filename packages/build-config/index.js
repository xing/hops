'use strict';

var hopsConfig = require('hops-config');

function freeze (config) {
  return Object.freeze(
    Object.keys(config).reduce(function (result, key) {
      var descriptor = { enumerable: true };
      if (typeof config[key] === 'function') {
        descriptor.get = config[key];
      } else {
        descriptor.value = config[key];
      }
      return Object.defineProperty(result, key, descriptor);
    }, {})
  );
}

module.exports = freeze({
  buildConfig: hopsConfig.buildConfig
    ? hopsConfig.buildConfig
    : require.resolve('./configs/build'),
  developConfig: hopsConfig.developConfig
    ? hopsConfig.developConfig
    : require.resolve('./configs/develop'),
  nodeConfig: hopsConfig.nodeConfig
    ? hopsConfig.nodeConfig
    : require.resolve('./configs/node')
});
