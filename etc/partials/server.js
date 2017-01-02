'use strict';

var appRoot = require('app-root-path');


exports.default = {
  hot: true,
  inline: true,
  contentBase: appRoot.resolve('dist'),
  publicPath: '/',
  host: '0.0.0.0',
  port: 8080,
  noInfo: true,
  stats: 'errors-only'
};
