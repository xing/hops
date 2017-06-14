#!/usr/bin/env node
'use strict';

var program = require('commander');
var rimraf = require('rimraf');

var hopsConfig = require('hops-config');
var hopsRoot = require('hops-root');

program
.version(require('./package.json').version)
.description('Commands: start, serve, develop, build')
.option('-p, --port', 'server TCP port')
.arguments('<command>')
.action(function run (command) {
  rimraf(hopsRoot.resolve(hopsConfig.buildDir), function () {
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
        require('./lib/util').logError('invalid command: ' + command);
        process.exit(1);
    }
  });
})
.parse(process.argv);
