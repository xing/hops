'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var hopsConfig = require('hops-config');
var hopsBuildConfig = require('hops-build-config');

var generate = require('./lib/generate');

var mergeWithPlugins = merge.strategy({ plugins: 'append' });

function injectPlugin(webpackConfig, plugin) {
  return mergeWithPlugins(webpackConfig, { plugins: [plugin] });
}

function injectProgressPlugin(webpackConfig) {
  return injectPlugin(webpackConfig, new webpack.ProgressPlugin());
}

function injectCleanPlugin(webpackConfig) {
  var dirs = [hopsConfig.buildDir, hopsConfig.cacheDir];
  return injectPlugin(
    webpackConfig,
    new CleanWebpackPlugin(dirs, {
      root: hopsConfig.appDir,
    })
  );
}

var buildConfig = injectProgressPlugin(require(hopsBuildConfig.buildConfig));
var nodeConfig = injectProgressPlugin(require(hopsBuildConfig.nodeConfig));

function defaultCallback(error, stats) {
  if (error) {
    console.error(error.stack.toString());
  } else {
    console.log(stats.toString({ chunks: false, modules: false }));
  }
}

function build(options, _callback) {
  var callback = _callback || defaultCallback;
  if (options.static) {
    webpack(options.clean ? injectCleanPlugin(buildConfig) : buildConfig).run(
      function(error, stats) {
        if (error) {
          callback(error, stats);
        } else {
          (hopsConfig.generate || generate)(nodeConfig)
            .then(callback.bind(null, null, stats))
            .catch(callback);
        }
      }
    );
  } else {
    webpack([
      options.clean ? injectCleanPlugin(buildConfig) : buildConfig,
      nodeConfig,
    ]).run(callback);
  }
}

module.exports = function runBuild(options, callback) {
  return build(options, callback);
};
