
var path = require('path');

var WebpackConfig = require('webpack-config').default;

var baseConfig = require('./webpack.node');

module.exports = new WebpackConfig().extend(baseConfig).merge({
  filename: __filename,
  resolve: {
    alias: {
      'hops-main': path.resolve(__dirname, '..', 'tmp')
    }
  }
});
