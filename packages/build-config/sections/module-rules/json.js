'use strict';

exports.default = {
  test: /\.json$/,
  use: {
    loader: require.resolve('json-loader')
  }
};
