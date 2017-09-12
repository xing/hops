'use strict';

var path = require('path');

var hopsConfig = require('../..');

exports.default = {
  test: /\.(html|svg|((o|t)tf)|woff2?|ico)$/,
  use: {
    loader: require.resolve('file-loader'),
    options: {
      name: path.join(hopsConfig.assetPath, '[name]-[hash:16].[ext]')
    }
  }
};
