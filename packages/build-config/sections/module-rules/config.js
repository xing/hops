'use strict';

exports.default = {
  test: /(packages\/|hops-)config\/index\.js$/,
  use: {
    loader: require.resolve('../../loaders/config')
  }
};
