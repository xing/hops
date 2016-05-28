
var path = require('path');

var WebpackConfig = require('webpack-config').default;

var config = require('../lib/config');
var baseConfig = path.join(__dirname, 'webpack.base');

module.exports = new WebpackConfig().extend(baseConfig).merge({
  devServer: {
    contentBase: config.distDir,
    watchOptions: {
      aggregateTimeout: 100
    }
  }
});
