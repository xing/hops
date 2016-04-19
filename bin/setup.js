#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var shell = require('shelljs');

var config = require('../lib/config');

var pkgPath = config.resolve('package.json');
var pkg = Object.assign({}, config.package);

Object.assign(pkg, {
  main: (shell.test('-e', pkg.main)) ? pkg.main : 'src/main.js',
  scripts: Object.assign(
    {
      start: 'hops start',
      watch: 'hops watch',
      build: 'hops build',
      render: 'hops render',
      lint: 'hops lint'
    },
    pkg.scripts
  ),
  babel: Object.assign(
    { extends: 'hops/etc/babel' },
    pkg.babel
  )
});

var template = [{
  origin: path.resolve(__dirname, '..', 'app', 'src', 'main.js'),
  destination: config.resolve(pkg.main)
}, {
  origin: path.resolve(__dirname, '..', 'app', 'src', 'style.css'),
  destination: path.resolve(path.dirname(config.resolve(pkg.main)), 'style.css')
}, {
  origin: path.resolve(__dirname, '..', 'app', '.eslintrc.js'),
  destination: config.resolve('.eslintrc.js')
}, {
  origin: path.resolve(__dirname, '..', 'app', '.stylelintrc.js'),
  destination: config.resolve('.stylelintrc.js')
}];

function configure() {
  fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  shell.echo('updated package.json');
}

function bootstrap() {
  template.forEach(function (file) {
    if (!shell.test('-e', file.destination)) {
      var destDir = path.dirname(file.destination);
      shell.mkdir('-p', destDir);
      shell.cp('-r', file.origin, destDir);
      shell.echo('created ' + file.destination.replace(destDir + '/', ''));
    }
  });
}

exports.configure = configure;
exports.bootstrap = bootstrap;

if (require.main === module) {
  configure();
  bootstrap();
}
