'use strict';

exports.default = {
  exclude: /\.(?:m?jsx?|html|json)$/,
  loader: require.resolve('file-loader'),
  options: {
    name: '[name]-[hash:16].[ext]',
  },
};

exports.node = {
  exclude: /\.(?:m?jsx?|html|json)$/,
  loader: require.resolve('file-loader'),
  options: {
    name: '[name]-[hash:16].[ext]',
    emitFile: false,
  },
};
