
var path = require('path');

var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('../lib/config');
var baseConfig = path.join(__dirname, 'webpack.base');

module.exports = new WebpackConfig().extend(baseConfig).merge({
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=' + config.cssName + '&importLoaders=1!postcss'
      )
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
  ]
});
