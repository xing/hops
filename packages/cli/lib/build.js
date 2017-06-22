'use strict';

var webpack = require('webpack');

var hopsEnv = require('hops-env');

var buildConfig = require(hopsEnv.buildConfig);
var nodeConfig = require(hopsEnv.nodeConfig);
var webpackConfig = [buildConfig, nodeConfig];

function defaultCallback (error, stats) {
  if (error) {
    console.error(error.stack.toString());
  } else {
    console.log(stats.toString({ chunks: false }));
  }
}

module.exports = function runBuild (callback) {
  webpack(webpackConfig).run(callback || defaultCallback);
};
