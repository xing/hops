'use strict';

var fs = require('fs');
var path = require('path');

var pkgDir = require('pkg-dir').sync;
var resolve = require('resolve').sync;

var appRoot = pkgDir();
var appModules = path.resolve(appRoot, 'node_modules');

var cache = {};

function checkEsnext (filepath) {
  if (/\.mjs$/.test(filepath)) return true;
  var pkgRoot = pkgDir(path.dirname(filepath));
  var packageJsonPath = path.resolve(pkgRoot, 'package.json');
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
        (module.indexOf(appRoot) === 0) &&
        ((module.indexOf(appModules) === -1) || checkEsnext(module))
      );
    } else {
      cache[module] = checkEsnextCached(resolve(module, {
        moduleDirectory: ['node_modules', path.resolve(appRoot, 'packages')]
      }));
    }
  }
  return cache[module];
};
