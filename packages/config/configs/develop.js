'use strict';

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var hopsRoot = require('hops-root');

var pkg = hopsRoot.require('package.json');

var watchOptions = {
  aggregateTimeout: 300,
  ignored: /node_modules/
};

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    require.resolve('../lib/shim')
  ],
  output: {
    path: hopsRoot.resolve('dist'),
    publicPath: '/',
    filename: '[name]-' + pkg.version + '.js',
    chunkFilename: 'chunk-[id]-' + pkg.version + '.js'
  },
  context: hopsRoot.toString(),
  resolve: {
    alias: {
      'hops-entry-point': hopsRoot.toString()
    },
    mainFields: ['hopsBrowser', 'browser', 'main'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      require('../loaders/babel').default,
      require('../loaders/postcss').develop,
      require('../loaders/json').default,
      require('../loaders/file').default,
      require('../loaders/url').default,
      require('../loaders/tpl').default
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin({
      writeToFileEmit: true
    })
  ],
  performance: {
    hints: false
  },
  devtool: '#source-map',
  devServer: {
    contentBase: hopsRoot.resolve('dist'),
    hot: true,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: watchOptions,
    setup: require('../lib/server-setup')(watchOptions)
  }
};
