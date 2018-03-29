'use strict';

var path = require('path');

var webpack = require('webpack');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var ServiceWorkerPlugin = require('../plugins/service-worker');
var MiniCSSExtractPlugin = require('mini-css-extract-plugin');

var hopsConfig = require('hops-config');

var getAssetPath = path.join.bind(path, hopsConfig.assetPath);

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  bail: true,
  entry: require.resolve('../shims/build'),
  output: {
    path: hopsConfig.buildDir,
    publicPath: '/',
    pathinfo: true,
    filename: getAssetPath('[name]-[chunkhash:16].js'),
    chunkFilename: getAssetPath('[name]-[chunkhash:16].js'),
    devtoolModuleFilenameTemplate: function(info) {
      return path
        .relative(hopsConfig.appDir, info.absoluteResourcePath)
        .replace(/\\/g, '/');
    },
  },
  context: hopsConfig.appDir,
  resolve: require('../sections/resolve')('build'),
  module: {
    rules: require('../sections/module-rules')('build'),
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: function(module) {
            if (module.resource) {
              if (
                module.resource.indexOf('hops-config') > -1 ||
                module.resource.indexOf('.css') === module.resource.length - 4
              ) {
                return false;
              }
            }
            return (
              module.context && module.context.indexOf('node_modules') > -1
            );
          },
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new StatsWriterPlugin({ fields: null }),
    new ServiceWorkerPlugin(),
    new MiniCSSExtractPlugin({
      filename: getAssetPath('[name]-[contenthash:16].css'),
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin(
      Object.assign(
        {
          NODE_ENV: 'production',
        },
        hopsConfig.envVars
      )
    ),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  performance: {
    assetFilter: function(assetFilename) {
      return assetFilename !== 'stats.json' && !/\.map$/.test(assetFilename);
    },
  },
};
