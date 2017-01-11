'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');


var cssLoaderOptions = {
  importLoaders: 1,
  modules: true,
  localIdentName: '[folder]-[name]-[local]-[hash:base64:5]',
  sourceMap: false
};


exports.build = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [
      {
        loader: 'css-loader',
        query: cssLoaderOptions
      },
      'postcss-loader'
    ]
  })
};

exports.develop = {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: Object.assign({}, cssLoaderOptions, { sourceMap: true })
    },
    'postcss-loader'
  ]
};

exports.render = {
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader/locals',
      options: Object.assign({}, cssLoaderOptions, { importLoaders: 0 })
    }
  ]
};
