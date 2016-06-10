
var path = require('path');

var WebpackConfig = require('webpack-config').default;

var baseConfig = require.resolve('./webpack.node');

module.exports = new WebpackConfig().extend(baseConfig).merge({
  filename: __filename,
  output: {
    path: path.resolve(__dirname, '..', 'tmp', 'dist')
  },
  resolve: {
    alias: {
      'hops-main': path.resolve(__dirname, '..', 'tmp')
    }
  }
});
