'use strict';

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HopsPlugin = require('hops-plugin');
var hopsRoot = require('hops-root');
var hopsConfig = require('..');

var pkg = hopsRoot.require('package.json');

module.exports = {
  entry: require.resolve('../lib/shim'),
  output: {
    path: hopsRoot.resolve('dist'),
    publicPath: '/',
    filename: '[name]-' + pkg.version + '.js',
    chunkFilename: 'chunk-[id]-' + pkg.version + '.js'
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
    new HopsPlugin(
      hopsConfig.locations,
      require(hopsConfig.renderConfig)
    ),
    new ManifestPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-' + pkg.version + '.css',
      allChunks: true,
      ignoreOrder: true
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
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
