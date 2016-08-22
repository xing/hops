#!/usr/bin/env node
/**
 * @module setup
 * @author Somebody <somebody@foo.bar>
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
  babel: { extends: 'hops/etc/babel'},
  stylelint: { extends: 'hops/etc/stylelint'},
  eslintConfig: { extends: './node_modules/hops/etc/eslint.js'},
  hops: { locations: ['/']}
});
/* eslint-enable */

var srcDir = path.resolve(__dirname, '..', 'app');
var template = [{
  source: path.join(srcDir, 'src'),
  destination: path.join(rootPath, 'src')
}];

function configure() {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  shell.echo('updated package.json');
}

function bootstrap() {
  template.forEach(function(file) {
    if (!shell.test('-e', file.destination)) {
      var destDir = path.dirname(file.destination);
      shell.mkdir('-p', destDir);
      shell.cp('-r', file.source, destDir);
      shell.echo('created ' + file.destination.replace(destDir + '/', ''));
    }
  });
}

function isBootstrapped() {
  var index = template.findIndex(function(file) {
    return shell.test('-e', file.destination);
  });
  return index >= 0;
}

if (
  require.main === module &&
  path.resolve(__dirname, '..') !== rootPath &&
  !shell.test('-e', path.join(rootPath, pkg.main)) &&
  !isBootstrapped()
) {
  configure();
  bootstrap();
}

exports.configure = configure;
exports.bootstrap = bootstrap;
