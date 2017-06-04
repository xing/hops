'use strict';

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HopsPlugin = require('hops-plugin');
var hopsRoot = require('hops-root');
var hopsConfig = require('..');

module.exports = {
  entry: require.resolve('../lib/shim'),
  output: {
    path: hopsRoot.resolve(hopsConfig.buildDir),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: 'chunk-[id]-[hash].js'
  },
  context: hopsRoot.toString(),
  resolve: {
    alias: {
      'hops-entry-point': hopsRoot.toString()
    },
    mainFields: ['hopsBrowser', 'browser', 'main'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      require('../loaders/babel').default,
      require('../loaders/postcss').build,
      require('../loaders/json').default,
      require('../loaders/file').default,
      require('../loaders/url').default,
      require('../loaders/tpl').default
    ]
  },
  plugins: [
    new ManifestPlugin({
      writeToFileEmit: true
    }),
    new HopsPlugin(
      hopsConfig.locations,
      require(hopsConfig.renderConfig)
    ),
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
      allChunks: true,
      ignoreOrder: true
    }),
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'production'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      sourceMap: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, unused: true, 'dead_code': true },
      output: { comments: false }
    }),
    new webpack.ProgressPlugin()
  ]
};
