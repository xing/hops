'use strict';

exports.default = {
  test: /\.(html|svg|((o|t)tf)|woff2?|ico)$/,
  use: {
    loader: 'file-loader'
  }
};
