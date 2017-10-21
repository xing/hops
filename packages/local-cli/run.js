#!/usr/bin/env node
'use strict';

var yargs = require('yargs');

var commands = require('./lib/commands');
var packageManifest = require('./package.json');

module.exports = function run (definition) {
  var args = yargs
    .version(packageManifest.version)
    .usage('Usage: $0 <command> [options]')
    .help('help')
    .alias('h', 'help')
    .demandCommand();
  var argv = process.argv.slice(2);

  if (definition && definition.command) {
    args.command(definition);
    argv.unshift(definition.command);
  } else {
    commands.forEach(function (command) {
      args.command(require(command));
    });
  }

  args.parse(argv);
};

if (require.main === module) {
  module.exports();
}
