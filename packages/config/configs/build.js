'use strict';

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HopsPlugin = require('hops-plugin');
var hopsRoot = require('hops-root');
var hopsConfig = require('..');
var WriteFilePlugin = require('../lib/write-file');

module.exports = {
  entry: require.resolve('../lib/hot-shim'),
  output: {
    path: hopsRoot.resolve(hopsConfig.buildDir),
    publicPath: '/',
    filename: '[name]-[chunkhash:16].js',
    chunkFilename: 'chunk-[id]-[chunkhash:16].js'
  },
  context: hopsRoot.toString(),
  resolve: require('../lib/resolve-config')('build'),
  module: {
    rules: require('../lib/loader-config')('build')
  },
  plugins: require('../lib/plugin-config')('build', [
    new ManifestPlugin({
      publicPath: '/'
    }),
    new WriteFilePlugin(/^manifest\.js(on)?$/),
    new HopsPlugin(
      hopsConfig.locations,
      require(hopsConfig.renderConfig)
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        if (module.resource && (/^.*\.css$/).test(module.resource)) {
          return false;
        }
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.js',
      minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash:16].css',
      allChunks: true,
      ignoreOrder: true
    }),
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'production'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      sourceMap: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, unused: true, 'dead_code': true },
      output: { comments: false }
    })
  ])
};
