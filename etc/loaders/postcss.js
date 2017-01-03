'use strict';


var cssLoaderOptions = {
  importLoaders: 1,
  modules: true,
  localIdentName: '[folder]-[name]-[local]-[hash:base64:5]',
  sourceMap: false
};


exports.build = {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: cssLoaderOptions
    },
    'postcss-loader'
  ]
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
