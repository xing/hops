'use strict';

var path = require('path');

var hopsConfig = require('hops-config');

exports.default = {
  exclude: /\.(?:m?jsx?|html|json)$/,
  loader: require.resolve('file-loader'),
  options: {
    name: path.join(hopsConfig.assetPath, '[name]-[hash:16].[ext]'),
  },
};

exports.node = {
  exclude: /\.(?:m?jsx?|html|json)$/,
  loader: require.resolve('file-loader'),
  options: {
    name: path.join(hopsConfig.assetPath, '[name]-[hash:16].[ext]'),
    emitFile: false,
  },
};
