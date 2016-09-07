/* eslint-disable no-underscore-dangle */
'use strict';

var util = require('util');

var webpack = require('webpack');
var appRoot = require('app-root-path');

var pkg = require('../package.json');

module.exports = require('./webpack.base.js').merge({
  entry: require.resolve('../lib/shim'),
  cache: {},
  devtool: '#eval-source-map',
  hops: {
    dll: [{
      path: util.format('hops-%s.js', pkg.version),
      source: appRoot.resolve('.tmp/webpack/watch/hops.js')
    }]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: appRoot.toString(),
      manifest: appRoot.require('.tmp/webpack/watch/hops.json')
    })
  ]
});
