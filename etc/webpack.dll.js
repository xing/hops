'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');
var appRoot = require('app-root-path');

var defaults = {
  entry: {
    hops: ['babel-polyfill', 'hops']
  },
  output: {
    filename: '[name].js',
    library: '__[name]__'
  },
  plugins: [ new webpack.ProgressPlugin() ]
};

module.exports = [
  merge(defaults, {
    output: {
      path: appRoot.resolve('.tmp/webpack/watch')
    },
    devtool: '#eval-source-map',
    plugins: [
      new webpack.DllPlugin({
        context: appRoot.toString(),
        path: appRoot.resolve('.tmp/webpack/watch/[name].json'),
        name: '__[name]__'
      })
    ]
  }),
  merge(defaults, {
    output: {
      path: appRoot.resolve('.tmp/webpack/build')
    },
    plugins: [
      new webpack.DllPlugin({
        context: appRoot.toString(),
        path: appRoot.resolve('.tmp/webpack/build/[name].json'),
        name: '__[name]__'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, unused: true, 'dead_code': true },
        output: { comments: false }
      })
    ]
  })
];
