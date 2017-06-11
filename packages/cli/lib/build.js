'use strict';

var webpack = require('webpack');
var rimraf = require('rimraf');

var hopsConfig = require('hops-config');

var buildConfig = require(hopsConfig.buildConfig);
var renderConfig = require(hopsConfig.renderConfig);
var webpackConfig = [buildConfig, renderConfig];

function defaultCallback (error, stats) {
  var util = require('./util');
  if (error) {
    util.logError(error.stack.toString());
  } else {
    util.logInfo(stats.toString({ chunks: false }));
  }
}

module.exports = function runBuild (callback) {
  rimraf(hopsConfig.buildDir, function () {
    webpack(webpackConfig).run(callback || defaultCallback);
  });
};
