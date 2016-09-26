'use strict';

var parseArgv = require('mocha-webpack/lib/cli/parseArgv').default;
var prepareWebpack = require('mocha-webpack/lib/cli/prepareWebpack').default;
var runner = require('mocha-webpack/lib/cli/runner');

var util = require('./index');

var webpackConfig = util.requireConfig('webpack.test.js');

var options = Object.assign(
  parseArgv(),
  {
    reporter: 'hops/reporter',
    require: ['source-map-support/register'],
    webpackConfig: webpackConfig,
    files: ['src/**/*.test.js*']
  },
  util.config.testRunner,
  webpackConfig.testRunner
);

prepareWebpack(options, function (err, config) {
  if (err) {
    throw err;
  } else if (options.watch) {
    runner.watch(options, config);
  } else {
    runner.run(options, config);
  }
});
