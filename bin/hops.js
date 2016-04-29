#!/usr/bin/env node

var path = require('path');
var util = require('util');

var shell = require('shelljs');

var config = require('../lib/config');

function exec() {
  var args = Array.from(arguments);
  return new Promise(function (resolve, reject) {
    var child = shell.exec(
      util.format.apply(util, args),
      {
        silent: true,
        env: Object.assign({}, process.env, {
          PATH: [
            path.resolve(config.appRoot, 'node_modules', '.bin'),
            process.env.PATH
          ].join(':'),
          PWD: config.appRoot
        })
      },
      function(code, stdout, stderr) {
        if (code === 0) { resolve(stdout); }
        else { reject(stderr); }
      }
    );
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });
}

function run(method) {
  switch (method) {
    case undefined:
    case 'start':
      shell.rm('-rf', config.distDir);
      run('render');
      run((process.env.NODE_ENV === 'production') ? 'build' : 'watch');
      break;
    case 'watch':
      exec(
        'chokidar "%s/**/*.+(css|js)" --silent -c "hops render"',
        config.srcDir
      );
      exec(
        'BABEL_ENV=hot webpack-dev-server -d --hot --inline --no-info --config %s',
        config.webpackDev
      );
      break;
    case 'build':
      exec('webpack -p --progress --config %s', config.webpackBuild);
      break;
    case 'render':
      exec('node %s', path.resolve(__dirname, 'render.js'));
      break;
    case 'lint':
      Promise.all([
        exec('eslint --config %s %s', config.eslint, config.srcDir),
        exec(
          'stylelint --config %s "%s/**/*.css"',
          config.stylelint,
          config.srcDir
        )
      ])
      .catch(function () { shell.exit(1); });
      break;
    case 'test':
      exec(
        'tape -r %s "%s" | faucet',
        path.resolve(__dirname, '../lib', 'config'),
        config.testGlob
      )
      .catch(function (error) {
        shell.echo(error);
        shell.exit(1);
      });
      break;
    default:
      shell.echo('Usage: hops [{start,watch,build,render,lint,test}]');
      shell.exit(1);
  }
}

exports.run = run;

if (require.main === module) {
  run.apply(this, process.argv.slice(2));
}
