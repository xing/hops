'use strict';

var path = require('path');

var hopsConfig = require('hops-config');

exports.default = {
  test: /\.webmanifest$/,
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: path.join(hopsConfig.assetPath, '[name]-[hash:16].[ext]'),
      },
    },
    {
      loader: require.resolve('web-app-manifest-loader'),
    },
  ],
};

exports.node = {
  test: /\.webmanifest$/,
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: path.join(hopsConfig.assetPath, '[name]-[hash:16].[ext]'),
        emitFile: false,
      },
    },
    {
      loader: require.resolve('web-app-manifest-loader'),
    },
  ],
};
