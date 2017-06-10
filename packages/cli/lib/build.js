'use strict';

var webpack = require('webpack');

var hopsConfig = require('hops-config');
var webpackConfig = require(hopsConfig.buildConfig);

var util = require('./util');

module.exports = function runBuild () {
  webpack(webpackConfig).run(function (error, stats) {
    if (error) {
      util.logError(error.stack.toString());
    } else {
      util.logInfo(stats.toString({ chunks: false }));
    }
  });
};
