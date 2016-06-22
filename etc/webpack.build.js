
var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.base.js',
  helpers.removeLoader.bind(null, 'css'),
  {
    entry: require.resolve('../lib/shim'),
    output: {
      filename: '[name]-[hash].js',
      chunkFilename: 'chunk-[id]-[hash].js'
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&localIdentName=[name]-[local]-[hash:base64:5]&importLoaders=1!postcss'
        )
      }]
    },
    hops: {
      dll: path.resolve(helpers.tmp, 'build', 'vendor.js')
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: helpers.root,
        manifest: require(path.resolve(helpers.tmp, 'build', 'vendor.json'))
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, unused: true, 'dead_code': true }
      }),
      new ExtractTextPlugin('[name]-[contenthash].css')
    ],
    extend: helpers.extend.bind(null, __filename)
  }
);
