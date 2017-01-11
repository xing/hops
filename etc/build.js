'use strict';

var webpack = require('webpack');
var appRoot = require('app-root-path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HopsPlugin = require('../plugin');

var pkg = appRoot.require('package.json');


module.exports = {
  entry: require.resolve('../lib/shim'),
  output: {
    path: appRoot.resolve('dist'),
    publicPath: '/',
    filename: '[name]-' + pkg.version + '.js',
    chunkFilename: 'chunk-[id]-' + pkg.version + '.js'
  },
  context: appRoot.toString(),
  resolve: {
    alias: {
      'hops-entry-point': appRoot.toString()
    },
    mainFields: ['hopsBrowser', 'browser', 'main'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      require('./loaders/babel').default,
      require('./loaders/postcss').build,
      require('./loaders/json').default,
      require('./loaders/file').default,
      require('./loaders/url').default
    ]
  },
  plugins: [
    new HopsPlugin(),
    new ExtractTextPlugin('[name]-' + pkg.version + '.css'),
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
