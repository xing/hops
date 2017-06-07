'use strict';

var path = require('path');
var root = require('pkg-dir').sync();

exports.resolve = path.resolve.bind(path, root);

exports.require = function () {
  return require(exports.resolve.apply(null, arguments));
};

exports.toString = function () {
  return root;
};
