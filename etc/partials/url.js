'use strict';

exports.default = {
  test: /\.((png)|(gif))$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
};
