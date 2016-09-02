'use strict';

var webpack = require('webpack');

module.exports = require('./webpack.watch.js').merge({
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    require.resolve('../lib/shim')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
