#!/usr/bin/env node
/**
 * @module setup
 * @author Somebody <somebody@foo.bar>
 */

var fs = require('fs');
var path = require('path');

var shell = require('shelljs');
var rootPath = require('app-root-path').toString();

var pkgPath = path.resolve(rootPath, 'package.json');
var pkg = require(pkgPath);

/* eslint-disable max-len */
Object.assign(pkg, {
  main: (shell.test('-e', pkg.main)) ? pkg.main : 'src/main.js',
  scripts: Object.assign(
    {
      start: '[ "$NODE_ENV" != "production" ] && npm run watch || npm run build',
      watch: 'webpack-dev-server --hot --config node_modules/hops/config',
      build: 'webpack --progress --config node_modules/hops/config',
      test: 'mocha-webpack --reporter hops/reporter --webpack-config node_modules/hops/config "src/**/*.test.js*"'
    },
    pkg.scripts
  ),
  babel: Object.assign({ extends: 'hops/etc/babel'}, pkg.babel),
  stylelint: Object.assign({ extends: 'hops/etc/stylelint'}, pkg.babel),
  eslintConfig: Object.assign({ extends: './node_modules/hops/etc/eslint.js'}, pkg.eslintConfig),
  hops: Object.assign({ locations: ['/']}, pkg.hops)
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
