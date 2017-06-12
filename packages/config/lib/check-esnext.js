'use strict';

var fs = require('fs');
var path = require('path');

var pkgDir = require('pkg-dir').sync;

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
  if (!cache[module]) {
    var filepath = path.isAbsolute(module) ? module : require.resolve(module);
    cache[module] = cache[filepath] = (
      !filepath.indexOf(appRoot) &&
      (filepath.indexOf(appModules) || checkEsnext(filepath))
    );
  }
  return cache[module];
};
