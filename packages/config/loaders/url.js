'use strict';

var path = require('path');

var hopsConfig = require('..');

exports.default = {
  test: /\.(png|gif|jpe?g|webp)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: path.join(hopsConfig.assetPath, '[name]-[hash:16].[ext]')
    }
  }
};
