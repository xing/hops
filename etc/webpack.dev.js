
var WebpackConfig = require('webpack-config').default;

var config = require('../lib/config');
var baseConfig = config.webpackBase;

module.exports = new WebpackConfig().extend(baseConfig).merge({
  filename: __filename,
  devtool: 'source-map',
  output: {
    pathinfo: true
  },
  devServer: {
    contentBase: config.distDir,
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 100
    }
  }
});
