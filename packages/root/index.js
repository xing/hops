var path = require('path');
var root = require('pkg-dir').sync();

exports.toString = function () {
  return root;
};

exports.resolve = function () {
  return path.resolve.apply(path, [root].concat(Array.from(arguments)));
};

exports.require = function () {
  return require(exports.resolve.apply(exports, arguments));
};
