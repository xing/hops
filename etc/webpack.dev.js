
var path = require('path');

var WebpackConfig = require('webpack-config');

var config = require('../lib/config');
var baseConfig = path.join(__dirname, 'webpack.base');

module.exports = new WebpackConfig().extend(baseConfig).merge({
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: [
        'style',
        'css?sourceMap&modules&localIdentName=' + config.cssName + '&importLoaders=1',
        'postcss'
      ]
    }]
  },
  devServer: {
    contentBase: config.distDir,
    proxy: {
      '/api/*': 'http://localhost:3000/'
    },
    watchOptions: {
      aggregateTimeout: 100
    }
  }
});
