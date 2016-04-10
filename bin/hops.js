#!/usr/bin/env node

var path = require('path');
var util = require('util');

var shell = require('shelljs');

var config = require('../lib/config');

function exec() {
  var child = shell.exec(
    util.format.apply(util, arguments),
    {
      async: true,
      silent: true,
      env: Object.assign({}, process.env, {
        PATH: [
          config.resolve(path.join('node_modules', '.bin')),
          process.env.PATH
        ].join(':'),
        PWD: config.appRoot
      })
    }
  );
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

function run(method) {
  switch (method) {
    case undefined:
    case 'start':
      shell.rm('-rf', config.distDir);
      run('prerender');
      run((process.env.NODE_ENV === 'production') ? 'build' : 'watch');
      break;
    case 'watch':
      exec(
        'chokidar "%s/**/*.+(css|js)" --silent -c "hops prerender"',
        config.srcDir
      );
      exec(
        'BABEL_ENV=hot webpack-dev-server -d --hot --inline --no-info --config %s',
        config.webpackDev
      );
      break;
    case 'build':
      exec(
        'webpack -p --progress --config %s',
        config.webpackBuild
      );
      break;
    case 'prerender':
      exec('node %s', require.resolve('../lib/prerender.js'));
      break;
    default:
      shell.echo('Usage: hops [{start,watch,build,prerender}]');
      shell.exit(1);
  }
}

module.exports = run;

if (require.main === module) {
  run.apply(this, process.argv.slice(2));
}
