'use strict';

var hopsConfig = require('hops-config');

var cssLoader = require.resolve('css-loader');
var postcssLoader = require.resolve('postcss-loader');

var cssLoaderGlobalOptions = {
  importLoaders: 1,
  sourceMap: true,
};

var cssLoaderLocalOptions = Object.assign({}, cssLoaderGlobalOptions, {
  modules: true,
  localIdentName: '[folder]-[name]-[local]-[hash:8]',
});

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

exports.default = {
  test: /\.css$/,
  oneOf: [
    {
      resourceQuery: /global/,
      use: [
        'style-loader',
        {
          loader: cssLoader,
          options: cssLoaderGlobalOptions,
        },
        {
          loader: postcssLoader,
          options: postcssLoaderOptions,
        },
      ],
    },
    {
      use: [
        'style-loader',
        {
          loader: cssLoader,
          options: cssLoaderLocalOptions,
        },
        {
          loader: postcssLoader,
          options: postcssLoaderOptions,
        },
      ],
    },
  ],
};

exports.node = {
  test: /\.css$/,
  oneOf: [
    {
      resourceQuery: /global/,
      use: {
        loader: require.resolve('css-loader/locals'),
        options: Object.assign({}, cssLoaderGlobalOptions, {
          importLoaders: 0,
        }),
      },
    },
    {
      use: {
        loader: require.resolve('css-loader/locals'),
        options: Object.assign({}, cssLoaderLocalOptions, {
          importLoaders: 0,
        }),
      },
    },
  ],
};
