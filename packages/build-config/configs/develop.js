'use strict';

var path = require('path');
var url = require('url');

var webpack = require('webpack');

var WriteManifestPlugin = require('../plugins/write-manifest');

var hopsConfig = require('hops-config');

var getAssetPath = path.join.bind(path, hopsConfig.assetPath);

module.exports = {
  entry: [
    require.resolve('webpack-dev-server/client') + '?' + url.format({
      protocol: hopsConfig.https ? 'https' : 'http',
      hostname: hopsConfig.host === '0.0.0.0' ? 'localhost' : hopsConfig.host,
      port: hopsConfig.port
    }),
    require.resolve('webpack/hot/dev-server'),
    require.resolve('../shims/develop')
  ],
  output: {
    path: hopsConfig.buildDir,
    publicPath: '/',
    filename: getAssetPath('[name].js'),
    chunkFilename: getAssetPath('chunk-[id].js')
  },
  context: hopsConfig.appDir,
  resolve: require('../sections/resolve')('develop'),
  module: {
    rules: require('../sections/module-rules')('develop')
  },
  plugins: [
    new WriteManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  performance: {
    hints: false
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: hopsConfig.buildDir,
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: 'errors-only',
    https: require('../sections/dev-server-https')()
  }
};
