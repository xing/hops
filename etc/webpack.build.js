
var webpack = require('webpack');
var WebpackConfig = require('webpack-config').default;

var config = require('../lib/config');
var baseConfig = config.webpackBase;

module.exports = new WebpackConfig().extend(baseConfig).merge({
  filename: __filename,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'stylelint',
        exclude: /node_modules/
      }
    ]
  },
  eslint: {
    configFile: config.eslint
  },
  stylelint: {
    configFile: config.stylelint
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: { comments: false },
      compress: { warnings: false }
    })
  ]
});
