'use strict';

exports.default = {
  test: /\.webmanifest$/,
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: '[name]-[hash:16].[ext]',
      },
    },
    {
      loader: require.resolve('../../loaders/webmanifest'),
    },
  ],
};

exports.node = {
  test: /\.webmanifest$/,
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: '[name]-[hash:16].[ext]',
        emitFile: false,
      },
    },
    {
      loader: require.resolve('../../loaders/webmanifest'),
    },
  ],
};
