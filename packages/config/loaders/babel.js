'use strict';

var fs = require('fs');
var path = require('path');

var pkgDir = require('pkg-dir').sync;

var hopsRoot = require('hops-root');
var hopsConfig = require('..');

var appRoot = hopsRoot.toString();
var appModules = hopsRoot.resolve('node_modules');

function hasPkgEsnext (filepath) {
  var pkgRoot = pkgDir(path.dirname(filepath));
  var packageJsonPath = path.resolve(pkgRoot, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    var packageJson = require(packageJsonPath);
    return !!Object.keys(packageJson).find(function (key) {
      return /^(?:(?:module)|(?:esnext(?::(?:browser|server))?))$/.test(key);
    });
  } else {
    return false;
  }
}

function getBabelLoader (targets) {
  return {
    test: /\.m?jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            'env',
            {
              modules: false,
              useBuiltIns: true,
              targets: targets
            }
          ],
          'react'
        ],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread'
        ]
      }
    },
    include: function (filepath) {
      return (
        !filepath.indexOf(appRoot) &&
        (filepath.indexOf(appModules) || hasPkgEsnext(filepath))
      );
    }
  };
}

exports.default = getBabelLoader({ browsers: hopsConfig.browsers });

exports.render = getBabelLoader({ node: 'current' });
