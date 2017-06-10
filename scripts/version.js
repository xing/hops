#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob');

var version = require('../package.json').version;

var packageDir = path.resolve(__dirname, '..', 'packages');
var globPattern = path.resolve(packageDir, '**', 'package.json');

glob(globPattern, function (err, matches) {
  if (err) {
    console.error(err);
  } else {
    matches.forEach(function (pkgPath) {
      var pkg = Object.assign({}, require(pkgPath));
      pkg.version = version;
      ['dependencies', 'peerDependencies'].forEach(function (key) {
        pkg[key] && Object.keys(pkg[key]).forEach(function (dependency) {
          if (!dependency.indexOf('hops-')) {
            pkg[key][dependency] = version;
          }
        });
      });
      fs.truncate(pkgPath, 0, function (err) {
        if (err) throw err;
        fs.writeFile(pkgPath, JSON.stringify(pkg, null, '  '), function (err) {
          if (err) throw err;
        });
      });
    });
  }
});
