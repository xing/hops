'use strict';

var path = require('path');

var webpack = require('webpack');

var ServiceWorkerPlugin = require('../plugins/service-worker');

var hopsConfig = require('hops-config');
var publicPath = ('/' + hopsConfig.assetPath + '/').replace(/\/\//, '/');

module.exports = {
  entry: [
    require.resolve('webpack-hot-middleware/client'),
    require.resolve('../shims/develop'),
  ],
  output: {
    path: path.join(hopsConfig.buildDir, hopsConfig.assetPath),
    publicPath: publicPath,
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js',
  },
  context: hopsConfig.appDir,
  resolve: require('../sections/resolve')('develop'),
  module: {
    rules: require('../sections/module-rules')('develop'),
  },
  plugins: [
    new ServiceWorkerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin(
      Object.assign(
        {
          NODE_ENV: 'development',
        },
        hopsConfig.envVars
      )
    ),
  ],
  performance: {
    hints: false,
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
  },
};
