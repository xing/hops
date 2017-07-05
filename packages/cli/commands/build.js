'use strict';

var webpack = require('webpack');

var hopsConfig = require('hops-config');
var HopsPlugin = require('hops-plugin');

var buildConfig = require(hopsConfig.buildConfig);
var nodeConfig = require(hopsConfig.nodeConfig);

function getWebpackConfig (program) {
  if (program.static) {
    buildConfig.plugins.push(
      new HopsPlugin(
        hopsConfig.locations.map(function (location) {
          return hopsConfig.basePath + location;
        }),
        nodeConfig
      ),
      new webpack.ProgressPlugin()
    );
    return buildConfig;
  } else {
    return [buildConfig, nodeConfig].map(function (config) {
      config.plugins.push(new webpack.ProgressPlugin());
      return config;
    });
  }
}

function defaultCallback (error, stats) {
  if (error) {
    console.error(error.stack.toString());
  } else {
    console.log(stats.toString({ chunks: false }));
  }
}

module.exports = function runBuild (program, callback) {
  webpack(getWebpackConfig(program)).run(callback || defaultCallback);
};
