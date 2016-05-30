
var WebpackConfig = require('webpack-config').default;

var config = require('../lib/config');
var baseConfig = config.webpackBase;

module.exports = new WebpackConfig().extend(baseConfig).merge({
  devServer: {
    contentBase: config.distDir,
    watchOptions: {
      aggregateTimeout: 100
    }
  }
});
