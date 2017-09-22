'use strict';

var path = require('path');
var webpack = require('webpack');

var hopsConfig = require('..');

var hopsConfigInstallDir = path.dirname(require.resolve('hops-config'));
var modulesDir = path.resolve(hopsConfigInstallDir, '..');

module.exports = {
  target: 'node',
  entry: require.resolve('../shims/node'),
  output: {
    path: hopsConfig.cacheDir,
    publicPath: '/',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  context: hopsConfig.appDir,
  resolve: require('../sections/resolve')('node'),
  externals: [require('webpack-node-externals')({
    modulesDir: modulesDir,
    whitelist: require('../lib/check-esnext')
  })],
  module: {
    rules: require('../sections/module-rules')('node')
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  performance: {
    hints: false
  },
  devtool: process.env.NODE_ENV !== 'production' && '#inline-source-map'
};
