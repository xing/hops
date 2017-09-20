'use strict';

var path = require('path');

var hopsConfig = require('hops-config');

exports.default = {
  test: /\.(png|gif|jpe?g|webp)$/,
  use: {
    loader: require.resolve('url-loader'),
    options: {
      limit: 10000,
      name: path.join(hopsConfig.assetPath, '[name]-[hash:16].[ext]')
    }
  }
};
