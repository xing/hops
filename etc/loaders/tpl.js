'use strict';


exports.default = {
  test: /\.tpl$/,
  use: {
    loader: require.resolve('../../lib/tpl-loader')
  }
};
