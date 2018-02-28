'use strict';

var hopsConfig = require('hops-config');

module.exports = exports = {
  get build() {
    return require(exports.buildConfig);
  },
  get develop() {
    return require(exports.developConfig);
  },
  get node() {
    return require(exports.nodeConfig);
  },
  buildConfig: hopsConfig.buildConfig
    ? hopsConfig.buildConfig
    : require.resolve('./configs/build'),
  developConfig: hopsConfig.developConfig
    ? hopsConfig.developConfig
    : require.resolve('./configs/develop'),
  nodeConfig: hopsConfig.nodeConfig
    ? hopsConfig.nodeConfig
    : require.resolve('./configs/node'),
};
