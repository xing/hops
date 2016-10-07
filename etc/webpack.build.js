'use strict';

var util = require('util');

var webpack = require('webpack');
var appRoot = require('app-root-path');

var pkg = require('../package.json');

module.exports = require('./webpack.base.js')
.removeLoader('css')
.merge({
  entry: require.resolve('../lib/shim'),
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: 'chunk-[id]-[hash].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: [
        {
          loader: 'css-loader/locals',
          query: {
            sourceMap: false,
            modules: true,
            localIdentName: '[folder]-[name]-[local]-[hash:base64:5]',
            importLoaders: 1
          }
        },
        'postcss'
      ]
    }]
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
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      sourceMap: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, unused: true, 'dead_code': true },
      output: { comments: false }
    }),
    new webpack.ProgressPlugin()
  ]
});
