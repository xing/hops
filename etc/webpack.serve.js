'use strict';

var appRoot = require('app-root-path');

module.exports = require('./webpack.watch.js').merge({
  entry: [
    require.resolve('webpack-dev-server/client') + '?http://localhost:8080',
    'webpack/hot/dev-server',
    require.resolve('../lib/shim')
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: appRoot.resolve('dist'),
    host: '0.0.0.0',
    port: 8080,
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 100
    },
    stats: 'errors-only'
  }
});
