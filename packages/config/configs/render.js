'use strict';

var webpack = require('webpack');

var hopsConfig = require('..');

module.exports = {
  target: 'node',
  entry: hopsConfig.appDir,
  output: {
    path: hopsConfig.buildDir,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  context: hopsConfig.appDir,
  resolve: require('../lib/resolve-config')('render'),
  externals: [require('webpack-node-externals')({
    whitelist: require('../lib/check-esnext')
  })],
  module: {
    rules: require('../lib/loader-config')('render')
  },
  plugins: require('../lib/plugin-config')('render', [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'development'
    })
  ]),
  performance: {
    hints: false
  },
  devtool: process.env.NODE_ENV !== 'production' && '#inline-source-map'
};
