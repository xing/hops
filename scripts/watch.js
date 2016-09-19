'use strict';

var webpack = require('webpack');

var util = require('./index');

var webpackConfig = util.requireConfig('webpack.watch.js');

webpack(webpackConfig).watch({}, function(error) {
  // eslint-disable-next-line no-console
  if (error) { console.log(error); }
});
