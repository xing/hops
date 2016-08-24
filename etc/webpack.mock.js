'use strict';

var path = require('path');

module.exports = require('./webpack.node.js').merge({
  entry: path.resolve(__dirname, '..', '.tmp', 'test'),
  output: {
    path: path.resolve(__dirname, '..', '.tmp', 'test', 'dist')
  }
});
