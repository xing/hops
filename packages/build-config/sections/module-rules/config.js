'use strict';

exports.default = {
  test: /(?:packages\/|hops-)config\/index\.js$/,
  loader: require.resolve('../../loaders/config'),
};

exports.node = {
  test: /(?:packages\/|hops-)config\/index\.js$/,
  loader: require.resolve('../../loaders/config'),
  options: { target: 'node' },
};
