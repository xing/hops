'use strict';

var fs = require('fs');
var path = require('path');

var getPkgDir = require('pkg-dir').sync;

var appDir = getPkgDir();
var moduleDir = path.resolve(appDir, 'node_modules');
var shimDir = path.resolve(__dirname, '..', 'shims');

function checkESnextPath (filepath) {
  return (
    (filepath.indexOf(appDir) === 0) &&
    (
      (filepath.indexOf(shimDir) === 0) ||
      (filepath.indexOf(moduleDir) === -1) ||
      (filepath.indexOf('.mjs') === filepath.length - 4)
    )
  );
}

function checkEsnextConfig (filepath) {
  var pkgDir = getPkgDir(path.dirname(filepath));
  var packageJsonPath = path.resolve(pkgDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    var json = fs.readFileSync(packageJsonPath, 'utf8');
    return /"(module|((e|j)snext(:(browser|server|main))?))":/m.test(json);
  }
}

var cache = {};
module.exports = function checkEsnextCached (module) {
  if (!(module in cache)) {
    if (path.isAbsolute(module)) {
      cache[module] = checkESnextPath(module) || checkEsnextConfig(module);
    } else {
      cache[module] = checkEsnextCached(require.resolve(module));
    }
  }
  return cache[module];
};
