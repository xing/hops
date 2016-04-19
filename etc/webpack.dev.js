
var path = require('path');

var WebpackConfig = require('webpack-config');

var config = require('../lib/config');
var baseConfig = path.join(__dirname, 'webpack.base');

module.exports = new WebpackConfig().extend(baseConfig).merge({
  module: {
    loaders: [{
      test: /\.(css|pcss)$/,
      loaders: [
        'style',
        'css?sourceMap&modules&localIdentName=' + config.cssName + '&importLoaders=1',
        'postcss'
      ]
    }]
  },
  watchOptions: {
    aggregateTimeout: 100
  },
  devServer: {
    contentBase: config.distDir
  }
});
