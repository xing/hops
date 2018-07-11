'use strict';

var path = require('path');

var webpack = require('webpack');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var ServiceWorkerPlugin = require('../plugins/service-worker');
var MiniCSSExtractPlugin = require('mini-css-extract-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

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
      chunks: 'all',
    },
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: { comments: false },
        },
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          reduceIdents: { disable: true },
          zindex: { disable: true },
          mergeIdents: { disable: true },
          discardUnused: { disable: true },
          autoprefixer: { disable: true },
        },
      }),
    ],
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
