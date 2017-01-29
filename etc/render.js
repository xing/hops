'use strict';

var appRoot = require('app-root-path');

var webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: appRoot.toString(),
  output: {
    path: appRoot.toString(),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  context: appRoot.toString(),
  resolve: {
    mainFields: ['hopsServer', 'server', 'main'],
    extensions: ['.js', '.jsx']
  },
  externals: [require('webpack-node-externals')()],
  module: {
    rules: [
      require('./loaders/babel').default,
      require('./loaders/postcss').render,
      require('./loaders/json').default,
      require('./loaders/file').default,
      require('./loaders/url').default,
      require('./loaders/tpl').default
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  devtool: '#inline-source-map'
};
