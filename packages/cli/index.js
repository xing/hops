#!/usr/bin/env node
'use strict';

var program = require('commander');
var rimraf = require('rimraf');

var hopsConfig = require('hops-config');

var util = require('./lib/util');
var version = require('./package.json').version;

function run (command) {
  switch (command) {
    case 'start':
      return run(process.env.NODE_ENV === 'production' ? 'serve' : 'develop');
    case 'serve':
      return require('./lib/serve')(program.port);
    case 'develop':
      return require('./lib/develop')(program.port);
    case 'build':
      return require('./lib/build')();
    default:
      util.logError('invalid command: ' + command);
      process.exit(1);
  }
}

program
.version(version)
.description('Commands: start, serve, develop, build')
.option('-p, --port', 'server TCP port')
.arguments('<command>')
.action(run);

rimraf(hopsConfig.buildDir, function () {
  program.parse(process.argv);
});
