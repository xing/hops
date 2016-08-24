'use strict';

var util = require('util');

var webpack = require('webpack');
var appRoot = require('app-root-path');

var pkg = require('../package.json');

module.exports = require('./webpack.base.js').merge({
  entry: require.resolve('../lib/shim'),
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: 'chunk-[id]-[hash].js'
  },
  hops: {
    config: require.resolve('./webpack.node.js'),
    dll: [{
      path: util.format('hops-%s.js', pkg.version),
      source: appRoot.resolve('.tmp/webpack/build/hops.js')
    }]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: appRoot.toString(),
      manifest: appRoot.require('.tmp/webpack/build/hops.json')
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, unused: true, 'dead_code': true },
      output: { comments: false }
    })
  ]
});
