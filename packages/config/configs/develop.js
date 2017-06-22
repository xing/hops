'use strict';

var url = require('url');

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var hopsEnv = require('hops-env');

module.exports = {
  entry: [
    'webpack-dev-server/client?' + url.format({
      protocol: hopsEnv.https ? 'https' : 'http',
      hostname: hopsEnv.host,
      port: hopsEnv.port
    }),
    'webpack/hot/dev-server',
    require.resolve('../shims/develop')
  ],
  output: {
    path: hopsEnv.buildDir,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js'
  },
  context: hopsEnv.appDir,
  resolve: require('../sections/resolve')('develop'),
  module: {
    rules: require('../sections/module-rules')('develop')
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
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: hopsEnv.buildDir,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: 'errors-only'
  }
};
