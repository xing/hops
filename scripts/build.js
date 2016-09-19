'use strict';

var webpack = require('webpack');

var util = require('./index');

var webpackConfig = util.requireConfig('webpack.build.js');

webpack(webpackConfig).run(function(error, stats) {
  // eslint-disable-next-line no-console
  if (error) { console.log(error); }
  // eslint-disable-next-line no-console
  else { console.log(stats.toString({ chunks: false })); }
});
