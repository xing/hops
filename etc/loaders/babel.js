'use strict';


exports.default = {
  test: /\.jsx?$/,
  use: [{
    loader: 'babel-loader'
  }],
  exclude: /node_modules\//
};
