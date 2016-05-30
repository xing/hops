
var webpack = require('webpack');
var WebpackConfig = require('webpack-config').default;

var baseConfig = require('../lib/config').webpackBase;

module.exports = new WebpackConfig().extend(baseConfig).merge({
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
  ]
});
