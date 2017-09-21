'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');

var hopsConfig = require('hops-config');
var HopsPlugin = require('hops-plugin');

var buildConfig = require(hopsConfig.buildConfig);
var nodeConfig = require(hopsConfig.nodeConfig);

var cleanup = require('./lib/cleanup');

var mergeWithPlugins = merge.strategy({ plugins: 'append' });

function getWebpackConfig (options) {
  if (options.static) {
    return mergeWithPlugins(
      buildConfig,
      {
        plugins: [
          new HopsPlugin(
            hopsConfig.locations,
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

module.exports = function runBuild (options, callback) {
  function build () {
    return webpack(getWebpackConfig(options)).run(callback || defaultCallback);
  }

  if (options.clean) {
    var dirs = [hopsConfig.buildDir, hopsConfig.cacheDir];
    return cleanup(dirs).then(build);
  } else {
    return build();
  }
};
