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
      run((process.env.NODE_ENV === 'production') ? 'build' : 'watch');
      break;
    case 'watch':
      exec(
        'BABEL_ENV=webpack webpack-dev-server -d --hot --inline --no-info --config "%s"',
        config.webpackDev
      );
      break;
    case 'build':
      exec(
        'BABEL_ENV=webpack webpack -p --progress --config "%s"',
        config.webpackBuild
      );
      break;
    case 'lint':
      Promise.all([
        exec('eslint --config "%s" "%s"', config.eslint, config.srcDir),
        exec(
          'stylelint --config "%s" "%s/**/*.css"',
          config.stylelint,
          config.srcDir
        )
      ])
      .catch(function (error) {
        shell.echo(error);
        shell.exit(1);
      });
      break;
    case 'test':
      shell.rm('-rf', path.resolve(config.appRoot, 'coverage'));
      exec(
        'istanbul cover -x "%s" --root "%s" --print none --report none tape -- -r "%s" "%s" | faucet',
        config.testGlob,
        config.srcDir,
        path.resolve(__dirname, '../', 'shims', 'test'),
        config.testGlob
      )
      .then(function () {
        return exec(
          '[ -n \"$npm_config_coverage\" ] && istanbul report text-summary || exit 0'
        );
      })
      .catch(function (error) {
        shell.echo(error);
        shell.exit(1);
      });
      break;
    default:
      shell.echo('Usage: hops [{start,watch,build,lint,test}]');
      shell.exit(1);
  }
}

exports.run = run;

if (require.main === module) {
  run.apply(this, process.argv.slice(2));
}
