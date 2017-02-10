'use strict';

var appRoot = require('app-root-path');

var webpack = require('webpack');

var createMiddleware = require('../middleware');
var hopsConfig = require('../config')();

var pkg = appRoot.require('package.json');

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
    path: appRoot.resolve('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name]-' + pkg.version + '.js',
    chunkFilename: 'chunk-[id]-' + pkg.version + '.js'
  },
  context: appRoot.toString(),
  resolve: {
    alias: {
      'hops-entry-point': appRoot.toString()
    },
    mainFields: ['hopsBrowser', 'browser', 'main'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      require('./loaders/babel').default,
      require('./loaders/postcss').develop,
      require('./loaders/json').default,
      require('./loaders/file').default,
      require('./loaders/url').default
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  performance: {
    hints: false
  },
  devtool: '#source-map',
  devServer: {
    hot: true,
    contentBase: appRoot.resolve('dist'),
    host: 'localhost',
    noInfo: true,
    stats: 'errors-only',
    watchOptions: watchOptions,
    setup: function (app) {
      var webpackConfig = require(hopsConfig.renderConfig);
      var middleware = createMiddleware(webpackConfig, watchOptions);
      hopsConfig.locations.forEach(function (location) {
        app.all(location, middleware);
      });
    }
  }
};
