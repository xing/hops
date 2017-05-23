var fs = require('fs');
var path = require('path');

var root = process.cwd();
while (
  root !== path.sep &&
  !fs.existsSync(path.resolve(root, 'package.json'))
) {
  root = path.dirname(root);
}

exports.toString = function () {
  return root;
};

exports.resolve = function () {
  return path.resolve.apply(path, [root].concat(Array.from(arguments)));
};

exports.require = function () {
  return require(exports.resolve.apply(exports, arguments));
};
