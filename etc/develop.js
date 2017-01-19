'use strict';

var appRoot = require('app-root-path');

var webpack = require('webpack');

var util = require('../lib/util');
var createMiddleware = require('../middleware');

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
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    hot: true,
    contentBase: appRoot.resolve('dist'),
    host: 'localhost',
    port: 8080,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: watchOptions,
    setup: function (app) {
      var config = util.getConfig();
      var middleware = createMiddleware(config, watchOptions);
      config.locations.forEach(function (location) {
        app.all(location, middleware);
      });
    }
  }
};
