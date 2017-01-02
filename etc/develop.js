'use strict';

var webpack = require('webpack');

var HopsPlugin = require('../plugin');


module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    require.resolve('../lib/shim')
  ],
  output: require('./partials/output').default,
  context: require('./partials/context').default,
  resolve: require('./partials/resolve').default,
  module: {
    rules: [
      require('./partials/babel').default,
      require('./partials/postcss').develop,
      require('./partials/json').default,
      require('./partials/file').default,
      require('./partials/url').default
    ]
  },
  plugins: [
    new HopsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: '#eval-source-map',
  devServer: require('./partials/server').default
};
