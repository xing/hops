#!/usr/bin/env node
/**
 * @file bin/setup
 *
 * @author dmbch <daniel@dmbch.net>
 */
'use strict';

var fs = require('fs');
var path = require('path');

var shell = require('shelljs');
var rootPath = require('app-root-path').toString();

var pkgPath = path.resolve(rootPath, 'package.json');
var pkg = require(pkgPath);

/* eslint-disable max-len */
Object.assign(pkg, {
  main: 'src/main.js',
  scripts: {
    start: '[ "$NODE_ENV" != "production" ] && npm run watch || npm run build',
    watch: 'webpack-dev-server --hot --config node_modules/hops/etc/webpack.watch.js',
    build: 'webpack --progress --config node_modules/hops/etc/webpack.build.js',
    test: 'mocha-webpack --reporter hops/reporter --webpack-config node_modules/hops/etc/webpack.test.js "src/**/*.test.js*"'
  },
  hops: { locations: ['/']}
});
/* eslint-enable */

function updatePackage() {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  shell.echo('updated package.json');
}

function copyDemoApp() {
  var sourceDir = path.resolve(__dirname, '..', 'app', 'src');
  var destDir = path.join(rootPath, 'src');
  shell.cp('-r', sourceDir, destDir);
}

if (
  require.main === module &&
  path.resolve(__dirname, '..') !== rootPath &&
  !shell.test('-e', path.join(rootPath, pkg.main)) &&
  !process.env.HOPS_NO_BOOTSTRAP
) {
  updatePackage();
  copyDemoApp();
}

exports.updatePackage = updatePackage;
exports.copyDemoApp = copyDemoApp;
