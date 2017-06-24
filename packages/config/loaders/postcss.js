'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var hopsConfig = require('..');

var cssLoaderOptions = {
  importLoaders: 1,
  modules: true,
  localIdentName: '[folder]-[name]-[local]-[hash:8]',
  sourceMap: false
};

var postcssLoaderOptions = {
  ident: 'postcss',
  plugins: [
    require('postcss-import')({
      addModulesDirectories: [].concat(hopsConfig.moduleDirs)
    }),
    require('postcss-cssnext')({
      browsers: hopsConfig.browsers
    })
  ]
};

exports.build = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: cssLoaderOptions
      },
      {
        loader: 'postcss-loader',
        options: postcssLoaderOptions
      }
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
    {
      loader: 'postcss-loader',
      options: postcssLoaderOptions
    }
  ]
};

exports.node = {
  test: /\.css$/,
  use: {
    loader: 'css-loader/locals',
    options: Object.assign({}, cssLoaderOptions, { importLoaders: 0 })
  }
};
