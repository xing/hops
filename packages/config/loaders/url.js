'use strict';

exports.default = {
  test: /\.(png|gif|jpe?g|webp)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
};
