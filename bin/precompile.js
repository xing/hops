#!/usr/bin/env node
'use strict';

var path = require('path');

var webpack = require('webpack');
var rootPath = require('app-root-path').toString();

var config = require('../etc/webpack.dll');

if (path.resolve(__dirname, '..') !== rootPath) {
  // eslint-disable-next-line no-console
  console.log('precompile dll');
  webpack(config).run(function(error) {
    // eslint-disable-next-line no-console
    if (error) { console.log(error); }
  });
}
