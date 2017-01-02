'use strict';

var webpack = require('webpack');

var HopsPlugin = require('../plugin');


module.exports = {
  entry: require.resolve('../lib/shim'),
  output: require('./partials/output').default,
  context: require('./partials/context').default,
  resolve: require('./partials/resolve').default,
  module: {
    rules: [
      require('./partials/babel').default,
      require('./partials/postcss').build,
      require('./partials/json').default,
      require('./partials/file').default,
      require('./partials/url').default
    ]
  },
  plugins: [
    new HopsPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      sourceMap: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, unused: true, 'dead_code': true },
      output: { comments: false }
    }),
    new webpack.ProgressPlugin()
  ]
};
