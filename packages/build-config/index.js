'use strict';

var hopsConfig = require('hops-config');

module.exports = {
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
