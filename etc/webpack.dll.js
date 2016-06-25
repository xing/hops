
var path = require('path');

var webpack = require('webpack');

var helpers = require('../config/helpers');

module.exports = {
  entry: {
    hops: ['hops']
  },
  output: {
    filename: '[name].js',
    library: '__[name]__'
  },
  modes: {
    watch: {
      output: {
        path: path.resolve(helpers.tmp, 'watch')
      },
      devtool: 'cheap-module-eval-source-map',
      plugins: [
        new webpack.DllPlugin({
          context: helpers.root,
          path: path.resolve(helpers.tmp, 'watch', '[name].json'),
          name: '__[name]__'
        })
      ]
    },
    build: {
      output: {
        path: path.resolve(helpers.tmp, 'build')
      },
      plugins: [
        new webpack.DllPlugin({
          context: helpers.root,
          path: path.resolve(helpers.tmp, 'build', '[name].json'),
          name: '__[name]__'
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false, unused: true, 'dead_code': true },
          output: { comments: false }
        })
      ]
    }
  },
  plugins: [ new webpack.ProgressPlugin() ],
  extend: helpers.extend.bind(null, __filename)
};
