'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');

var hopsConfig = require('hops-config');
var HopsPlugin = require('hops-plugin');

var buildConfig = require(hopsConfig.buildConfig);
var nodeConfig = require(hopsConfig.nodeConfig);

var mergeWithPlugins = merge.strategy({ plugins: 'append' });

function getWebpackConfig (program) {
  if (program.static) {
    return mergeWithPlugins(
      buildConfig,
      {
        plugins: [
          new HopsPlugin(
            hopsConfig.locations.map(function (location) {
              return hopsConfig.basePath + location;
            }),
            nodeConfig
          ),
          new webpack.ProgressPlugin()
        ]
      }
    );
  } else {
    return [buildConfig, nodeConfig].map(function (config) {
      return mergeWithPlugins(
        config,
        {
          plugins: [
            new webpack.ProgressPlugin()
          ]
        }
      );
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
