#!/usr/bin/env node
'use strict';

var yargs = require('yargs');

var findCommands = require('./lib/commands');
var packageManifest = require('./package.json');

module.exports = function run(defineCommand, command) {
  var args = yargs
    .version(packageManifest.version)
    .usage('Usage: $0 <command> [options]')
    .help('help')
    .alias('h', 'help')
    .demandCommand();
  var argv = process.argv.slice(2);

  if (defineCommand && command) {
    defineCommand(args);
    argv.unshift(command);
  } else {
    findCommands().forEach(function(commandPath) {
      require(commandPath)(args);
    });
  }

  args.parse(argv);
};

if (require.main === module) {
  module.exports();
}
