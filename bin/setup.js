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
var webpack = require('webpack');

var pkgPath = path.resolve(rootPath, 'package.json');
var pkg = require(pkgPath);

function updatePackage() {
  shell.echo('update package.json');
  Object.assign(pkg, {
    main: 'src/main.js',
    scripts: {
      start: 'hops',
      test: 'NODE_ENV=test jest'
    },
    hops: {
      locations: ['/']
    },
    jest: {
      cacheDirectory: '.tmp',
      moduleNameMapper: {
        '^.+\\.(html|css|svg|jpg|png|gif)$': 'identity-obj-proxy'
      }
    },
    babel: {
      presets: [['es2015', { modules: false }], 'stage-0', 'react'],
      plugins: ['transform-runtime'],
      env: { test: { plugins: ['transform-es2015-modules-commonjs']}}
    }
  });
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

function copyDemoApp() {
  shell.echo('create demo app');
  shell.cp('-r', path.resolve(__dirname, '..', 'app', 'src'), rootPath);
}

if (!pkg.scripts.start && !process.env.HOPS_NO_BOOTSTRAP) {
  updatePackage();
  copyDemoApp();
}

if (path.resolve(__dirname, '..') !== rootPath) {
  // eslint-disable-next-line no-console
  console.log('precompile dll');
  webpack(require('../etc/webpack.dll')).run(function(error) {
    // eslint-disable-next-line no-console
    if (error) { console.log(error); }
  });
}
