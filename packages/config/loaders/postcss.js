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
  parser: require('postcss-scss'),
  plugins: function (loader) {
    return [
      require('postcss-import')({
        addModulesDirectories: hopsConfig.modules
      }),
      require('postcss-mixins')(),
      require('postcss-advanced-variables')(),
      require('postcss-cssnext')({
        browsers: hopsConfig.browsers
      }),
      require('postcss-nested')(),
      require('postcss-atroot')(),
      require('postcss-property-lookup')(),
      require('postcss-extend')(),
      require('postcss-reporter')()
    ];
  }
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

exports.render = {
  test: /\.css$/,
  use: {
    loader: 'css-loader/locals',
    options: Object.assign({}, cssLoaderOptions, { importLoaders: 0 })
  }
};
