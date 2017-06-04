'use strict';

exports.default = {
  test: /\.(ico|png|gif|jpe?g|webp)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
};
