#!/usr/bin/env node

var webpack = require('webpack');

var helpers = require('../config/helpers');

var config = require(helpers.resolve('webpack.dll.js'));
webpack(config).run(function(error) {
  if (error) { console.log(error); } // eslint-disable-line no-console
});
