'use strict';

var webpack = require('webpack');
var appRoot = require('app-root-path');

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
      require('./loaders/postcss').develop,
      require('./loaders/json').default,
      require('./loaders/file').default,
      require('./loaders/url').default
    ]
  },
  plugins: [
    new HopsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};
