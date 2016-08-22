#!/usr/bin/env node
'use strict';

var path = require('path');

var webpack = require('webpack');

var helpers = require('../etc/helpers');
var config = require('../etc/webpack.dll');

if (path.resolve(__dirname, '..') !== helpers.root) {
  // eslint-disable-next-line no-console
  console.log('precompile dll');
  webpack(config).run(function(error) {
    // eslint-disable-next-line no-console
    if (error) { console.log(error); }
  });
}
