'use strict';

var webpack = require('webpack');

var hopsConfig = require('hops-config');

var buildConfig = require(hopsConfig.buildConfig);
var renderConfig = require(hopsConfig.renderConfig);
var webpackConfig = [buildConfig, renderConfig];

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
