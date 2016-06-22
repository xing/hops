#!/usr/bin/env node

var path = require('path');

var webpack = require('webpack');

var helpers = require('../config/helpers');

if (path.resolve(__dirname, '..') !== helpers.root) {
  // eslint-disable-next-line no-console
  console.log('precompile dll:');
  var defaults = helpers.extend('webpack.dll.js', {});
  var modes = defaults.modes || {};
  delete defaults.modes;
  Object.keys(modes).forEach(function (mode) {
    var config = helpers.merge(defaults, modes[mode]);
    webpack(config).run(function(error) {
      // eslint-disable-next-line no-console
      if (error) { console.log(error); }
    });
  });
}
