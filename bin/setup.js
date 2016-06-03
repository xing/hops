#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var shell = require('shelljs');

var config = require('../lib/config');

var pkgPath = path.resolve(config.appRoot, 'package.json');
var pkg = require(pkgPath);

var defaultTest = 'echo "Error: no test specified" && exit 1';
var hopsTest = 'tape -r hops/shims/test \'!(node_modules)/**/*.test.js\' | faucet';

Object.assign(pkg, {
  main: (shell.test('-e', pkg.main)) ? pkg.main : 'src/main.js',
  scripts: Object.assign(
    {
      start: '[ \"$NODE_ENV\" != "production" ] && npm run watch || npm run build',
      watch: 'BABEL_ENV=webpack webpack-dev-server --hot --inline',
      build: 'BABEL_ENV=webpack webpack || true'
    },
    pkg.scripts,
    {
      test: (pkg.scripts.test === defaultTest) ? hopsTest : pkg.scripts.test
    }
  ),
  babel: Object.assign({ extends: 'hops/etc/babel' }, pkg.babel)
});

var template = [{
  origin: path.resolve(__dirname, '..', 'app', 'src', 'main.js'),
  destination: path.resolve(config.appRoot, pkg.main)
}, {
  origin: path.resolve(__dirname, '..', 'app', 'src', 'main.test.js'),
  destination: path.resolve(config.srcDir, 'main.test.js')
}, {
  origin: path.resolve(__dirname, '..', 'app', 'src', 'style.css'),
  destination: path.resolve(config.srcDir, 'style.css')
}, {
  origin: path.resolve(__dirname, '..', 'app', '.eslintrc.js'),
  destination: path.resolve(config.appRoot, '.eslintrc.js')
}, {
  origin: path.resolve(__dirname, '..', 'app', '.stylelintrc.js'),
  destination: path.resolve(config.appRoot, '.stylelintrc.js')
}, {
  origin: path.resolve(__dirname, '..', 'app', 'webpack.config.js'),
  destination: path.resolve(config.appRoot, 'webpack.config.js')
}];

function configure() {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
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

if (
  require.main === module &&
  path.resolve(__dirname, '..') !== config.appRoot &&
  !shell.test('-e', path.resolve(config.appRoot, pkg.main))
) {
  configure();
  bootstrap();
}
