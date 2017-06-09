'use strict';

var webpack = require('webpack');

var hopsRoot = require('hops-root');
var hopsConfig = require('..');

module.exports = {
  target: 'node',
  entry: hopsRoot.toString(),
  output: {
    path: hopsRoot.resolve(hopsConfig.buildDir),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  context: hopsRoot.toString(),
  resolve: {
    mainFields: ['esnext:server', 'esnext', 'module', 'server', 'main'],
    extensions: ['.js', '.jsx']
  },
  externals: [require('webpack-node-externals')()],
  module: {
    rules: [
      require('../loaders/babel').render,
      require('../loaders/postcss').render,
      require('../loaders/json').default,
      require('../loaders/file').default,
      require('../loaders/url').default,
      require('../loaders/tpl').default
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  devtool: process.env.NODE_ENV !== 'production' && '#inline-source-map'
};
