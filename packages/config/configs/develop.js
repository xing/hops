'use strict';

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var hopsRoot = require('hops-root');
var hopsConfig = require('..');

module.exports = {
  entry: [
    'webpack-dev-server/client?' + hopsConfig.address,
    'webpack/hot/dev-server',
    require.resolve('../lib/hot-shim')
  ],
  output: {
    path: hopsRoot.resolve(hopsConfig.buildDir),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js'
  },
  context: hopsRoot.toString(),
  resolve: require('../lib/resolve-config')('develop'),
  module: {
    rules: require('../lib/loader-config')('develop')
  },
  plugins: require('../lib/plugin-config')('develop', [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin({
      writeToFileEmit: true,
      publicPath: '/'
    }),
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'development'
    })
  ]),
  performance: {
    hints: false
  },
  devtool: '#source-map',
  devServer: require('../lib/server-config')()
};
