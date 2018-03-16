'use strict';

exports.default = {
  test: /\.(png|gif|jpe?g|webp)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: '[name]-[hash:16].[ext]',
  },
};
