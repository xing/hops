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

function updatePackage() {
  shell.echo('update package.json');
  /* eslint-disable max-len */
  var newPkg = Object.assign({}, pkg, {
    main: 'src/main.js',
    scripts: {
      start: '[ "$NODE_ENV" != "production" ] && npm run watch || npm run build',
      watch: 'webpack-dev-server --hot --config node_modules/hops/etc/webpack.watch.js',
      build: 'webpack --progress --config node_modules/hops/etc/webpack.build.js',
      test: 'mocha-webpack --require source-map-support/register --reporter hops/reporter --webpack-config node_modules/hops/etc/webpack.test.js "src/**/*.test.js*"'
    },
    hops: { locations: ['/']}
  });
  /* eslint-enable */
  fs.writeFileSync(pkgPath, JSON.stringify(newPkg, null, 2));
}

function copyDemoApp() {
  shell.echo('create demo app');
  shell.cp('-r', path.resolve(__dirname, '..', 'app', 'src'), rootPath);
}

if (!pkg.scripts.start && !process.env.HOPS_NO_BOOTSTRAP) {
  updatePackage();
  copyDemoApp();
}
