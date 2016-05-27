
var path = require('path');

var webpack = require('webpack');
var WebpackConfig = require('webpack-config');

var baseConfig = path.join(__dirname, 'webpack.base');

module.exports = new WebpackConfig().extend(baseConfig).merge({
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
  ]
});
