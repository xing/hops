'use strict';

var hopsConfig = require('hops-config');

var cssLoaderOptions = {
  importLoaders: 1,
  modules: true,
  localIdentName: '[folder]-[name]-[local]-[hash:8]',
  sourceMap: false,
};

var postcssLoaderOptions = {
  ident: 'postcss',
  plugins: [
    require('postcss-import')({
      addModulesDirectories: [].concat(hopsConfig.moduleDirs),
    }),
    require('postcss-cssnext')({
      browsers: hopsConfig.browsers,
    }),
  ],
};

exports.build = {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: require.resolve('css-loader'),
      options: cssLoaderOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: postcssLoaderOptions,
    },
  ],
};

exports.develop = {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: require.resolve('css-loader'),
      options: Object.assign({}, cssLoaderOptions, { sourceMap: true }),
    },
    {
      loader: require.resolve('postcss-loader'),
      options: postcssLoaderOptions,
    },
  ],
};

exports.node = {
  test: /\.css$/,
  use: {
    loader: require.resolve('css-loader/locals'),
    options: Object.assign({}, cssLoaderOptions, { importLoaders: 0 }),
  },
};
