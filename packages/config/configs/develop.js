'use strict';

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var hopsRoot = require('hops-root');
var hopsConfig = require('..');

var watchOptions = {
  aggregateTimeout: 300,
  ignored: /node_modules/
};

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    require.resolve('../lib/shim')
  ],
  output: {
    path: hopsRoot.resolve(hopsConfig.buildDir),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js'
  },
  context: hopsRoot.toString(),
  resolve: require('../lib/resolve')('browser'),
  module: {
    rules: [
      require('../loaders/babel').default,
      require('../loaders/postcss').develop,
      require('../loaders/json').default,
      require('../loaders/file').default,
      require('../loaders/url').default,
      require('../loaders/tpl').default
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin({
      writeToFileEmit: true,
      publicPath: '/'
    }),
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'development'
    })
  ],
  performance: {
    hints: false
  },
  devtool: '#source-map',
  devServer: {
    contentBase: hopsRoot.resolve(hopsConfig.buildDir),
    hot: true,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: watchOptions,
    setup: require('../lib/server-setup')(watchOptions)
  }
};
