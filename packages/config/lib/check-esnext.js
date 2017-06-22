'use strict';

var fs = require('fs');
var path = require('path');

var getPkgDir = require('pkg-dir').sync;
var resolve = require('resolve').sync;

var appDir = getPkgDir();
var appModuleDir = path.resolve(appDir, 'node_modules');

var cache = {};

function checkEsnext (filepath) {
  if (
    /\.mjs$/.test(filepath) ||
    filepath.indexOf(path.resolve(__dirname, '..', 'shims')) === 0
  ) {
    return true;
  }
  var pkgDir = getPkgDir(path.dirname(filepath));
  var packageJsonPath = path.resolve(pkgDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    var json = fs.readFileSync(packageJsonPath);
    return /"(module|((e|j)snext(:(browser|server|main))?))":/m.test(json);
  } else {
    return false;
  }
}

module.exports = function checkEsnextCached (module) {
  if (!(module in cache)) {
    if (path.isAbsolute(module)) {
      cache[module] = (
        (module.indexOf(appDir) === 0) &&
        ((module.indexOf(appModuleDir) === -1) || checkEsnext(module))
      );
    } else {
      cache[module] = checkEsnextCached(resolve(module, {
        moduleDirectory: ['node_modules', path.resolve(appDir, 'packages')]
      }));
    }
  }
  return cache[module];
};
