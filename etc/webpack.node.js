'use strict';

var nodeExternals = require('webpack-node-externals');

var HopsPlugin = require('../plugin');

module.exports = require('./webpack.base.js')
.removePlugin(HopsPlugin)
.removeLoader('css')
.modify(function (config) { delete config.resolve.mainFields; return config; })
.merge({
  target: 'node',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: [
        {
          loader: 'css-loader/locals',
          query: {
            sourceMap: true,
            modules: true,
            localIdentName: '[folder]-[name]-[local]-[hash:base64:5]',
            importLoaders: 1
          }
        },
        'postcss'
      ]
    }]
  },
  devtool: '#inline-source-map',
  externals: [nodeExternals()],
  cache: {},
  resolve: {
    mainFields: ['main']
  }
});
