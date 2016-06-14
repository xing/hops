
var path = require('path');

var HopsPlugin = require('../plugin');
var helpers = require('../config/helpers');

module.exports = {
  entry: helpers.root,
  output: {
    path: path.resolve(helpers.root, 'dist'),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: 'chunk-[id]-[hash].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        cacheDirectory: path.resolve(helpers.root, '.tmp', 'babel')
      },
      exclude: /node_modules\//
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        {
          loader: 'css',
          query: {
            sourceMap: true,
            modules: true,
            localIdentName: '[name]-[local]-[hash:base64:5]',
            importLoaders: 1
          }
        },
        'postcss'
      ]
    }, {
      test: /\.((html)|(svg)|(jpeg))$/,
      loader: 'file'
    }, {
      test: /\.((png)|(gif))$/,
      loader: 'url?limit=100000'
    }]
  },
  postcss: [
    require('postcss-cssnext')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [ new HopsPlugin() ],
  extend: helpers.extend.bind(null, __filename)
};
