'use strict';

var path = require('path');

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BabiliPlugin = require('babili-webpack-plugin');

var WriteFilePlugin = require('../lib/write-file');
var hopsConfig = require('..');

var getAssetPath = path.join.bind(path, hopsConfig.assetPath);

module.exports = {
  entry: require.resolve('../shims/build'),
  output: {
    path: hopsConfig.buildDir,
    publicPath: '/',
    filename: getAssetPath('[name]-[chunkhash:16].js'),
    chunkFilename: getAssetPath('chunk-[id]-[chunkhash:16].js')
  },
  context: hopsConfig.appDir,
  resolve: require('../sections/resolve')('build'),
  module: {
    rules: require('../sections/module-rules')('build')
  },
  plugins: [
    new ManifestPlugin({
      publicPath: '/'
    }),
    new WriteFilePlugin(/^manifest\.js(on)?$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        if (module.resource) {
          if (
            (module.resource.indexOf('hops-config') > -1) ||
            (module.resource.indexOf('.css') === module.resource.length - 4)
          ) {
            return false;
          }
        }
        return module.context && module.context.indexOf('node_modules') > -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.js',
      minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: getAssetPath('[name]-[contenthash:16].css'),
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
    new BabiliPlugin(
      { evaluate: false },
      { comments: false }
    )
  ]
};
