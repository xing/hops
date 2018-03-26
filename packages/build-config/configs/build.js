'use strict';

var path = require('path');

var webpack = require('webpack');
var UglifyPlugin = require('uglifyjs-webpack-plugin');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var WriteManifestPlugin = require('../plugins/write-manifest');
var ServiceWorkerPlugin = require('../plugins/service-worker');

var hopsConfig = require('hops-config');

var getAssetPath = path.join.bind(path, hopsConfig.assetPath);

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: require.resolve('../shims/build'),
  output: {
    path: hopsConfig.buildDir,
    publicPath: '/',
    filename: getAssetPath('[name]-[chunkhash:16].js'),
    chunkFilename: getAssetPath('[name]-[id]-[chunkhash:16].js'),
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
    new WriteManifestPlugin(),
    new StatsWriterPlugin({ fields: null }),
    new ServiceWorkerPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin(
      Object.assign(
        {
          NODE_ENV: 'production',
        },
        hopsConfig.envVars
      )
    ),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      sourceMap: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyPlugin({ sourceMap: true, cache: true, parallel: true }),
  ],
  performance: {
    assetFilter: function(assetFilename) {
      return assetFilename !== 'stats.json' && !/\.map$/.test(assetFilename);
    },
  },
};
