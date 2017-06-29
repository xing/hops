'use strict';

var fs = require('fs');
var path = require('path');

var getPkgDir = require('pkg-dir').sync;

var appDir = getPkgDir();
var moduleDir = path.resolve(appDir, 'node_modules');
var shimDir = path.resolve(__dirname, '..', 'shims');

function checkEsnext (filepath) {
  if (/\.mjs$/.test(filepath) || filepath.indexOf(shimDir) === 0) {
    return true;
  }
  var pkgDir = getPkgDir(path.dirname(filepath));
  var packageJsonPath = path.resolve(pkgDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    var json = fs.readFileSync(packageJsonPath, 'utf8');
    return /"(module|((e|j)snext(:(browser|server|main))?))":/m.test(json);
  } else {
    return false;
  }
}

var cache = {};
module.exports = function checkEsnextCached (module) {
  if (!(module in cache)) {
    if (path.isAbsolute(module)) {
      cache[module] = (
        (module.indexOf(appDir) === 0) &&
        ((module.indexOf(moduleDir) === -1) || checkEsnext(module))
      );
    } else {
      cache[module] = checkEsnextCached(require.resolve(module));
    }
  }
  return cache[module];
};
