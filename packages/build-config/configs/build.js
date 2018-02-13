'use strict';

var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyPlugin = require('uglifyjs-webpack-plugin');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var WriteFilePlugin = require('../plugins/write-file');
var ServiceWorkerPlugin = require('../plugins/webpack-service-worker');

var hopsConfig = require('hops-config');

var getAssetPath = path.join.bind(path, hopsConfig.assetPath);

module.exports = {
  entry: require.resolve('../shims/build'),
  output: {
    path: hopsConfig.buildDir,
    publicPath: '/',
    filename: getAssetPath('[name]-[chunkhash:16].js'),
    chunkFilename: getAssetPath('chunk-[id]-[chunkhash:16].js'),
  },
  context: hopsConfig.appDir,
  resolve: require('../sections/resolve')('build'),
  module: {
    rules: require('../sections/module-rules')('build'),
  },
  devtool: 'source-map',
  plugins: [
    new WriteFilePlugin(/^manifest\.js(\.map)?$/),
    new StatsWriterPlugin({ fields: null }),
    new ServiceWorkerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        if (module.resource) {
          if (
            module.resource.indexOf('hops-config') > -1 ||
            module.resource.indexOf('.css') === module.resource.length - 4
          ) {
            return false;
          }
        }
        return module.context && module.context.indexOf('node_modules') > -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.js',
      minChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: getAssetPath('[name]-[contenthash:16].css'),
      allChunks: true,
      ignoreOrder: true,
    }),
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
