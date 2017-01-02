'use strict';

var path = require('path');

var appRoot = require('app-root-path');


exports.default = {
  path: path.resolve(appRoot.toString(), 'dist'),
  publicPath: '/',
  filename: '[name].js',
  chunkFilename: 'chunk-[id].js'
};

exports.render = Object.assign({}, exports.default, {
  filename: '[name]-[hash].js',
  chunkFilename: 'chunk-[id]-[hash].js'
});
