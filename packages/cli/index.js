#!/usr/bin/env node
'use strict';

var program = require('commander');
var rimraf = require('rimraf');

var hopsEnv = require('hops-env');

program
.version(require('./package.json').version)
.description('Commands: start, serve, develop, build')
.arguments('<command>')
.action(function run (command) {
  rimraf(hopsEnv.buildDir, function () {
    switch (command) {
      case 'start':
        return run(process.env.NODE_ENV === 'production' ? 'serve' : 'develop');
      case 'serve':
        return require('./lib/serve')();
      case 'develop':
        return require('./lib/develop')();
      case 'build':
        return require('./lib/build')();
      default:
        console.error('invalid command: ' + command);
        process.exit(1);
    }
  });
})
.parse(process.argv);
