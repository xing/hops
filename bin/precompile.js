#!/usr/bin/env node

var path = require('path');

var webpack = require('webpack');

var helpers = require('../config/helpers');

if (path.resolve(__dirname, '..') !== helpers.root) {
  // eslint-disable-next-line no-console
  console.log('precompile dll');
  var config = require(helpers.resolve('webpack.dll.js'));
  webpack(config).run(function(error) {
    // eslint-disable-next-line no-console
    if (error) { console.log(error); }
  });
}
