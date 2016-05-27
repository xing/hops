
var path = require('path');

var WebpackConfig = require('webpack-config');

var config = require('../lib/config');
var baseConfig = path.join(__dirname, 'webpack.base');

module.exports = new WebpackConfig().extend(baseConfig).merge({
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
