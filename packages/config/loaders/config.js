'use strict';

exports.default = {
  test: /hops-config\/index\.js$/,
  use: {
    loader: require.resolve('../lib/config-loader')
  }
};
