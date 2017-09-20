#!/usr/bin/env node
'use strict';

var yargs = require('yargs');

var pm = require('./lib/package-manager');
var packageManifest = require('./package.json');

module.exports = function run (argv, callback) {
  var args = yargs
    .version(packageManifest.version)
    .usage('Usage: $0 <command> [options]')
    .help('help')
    .alias('h', 'help')
    .demandCommand();

  if (pm.isPackageInstalled('hops-build')) {
    args.command(require('./commands/build')(callback));
    args.command(require('./commands/develop')(callback));
  }

  if (pm.isPackageInstalled('hops-express')) {
    args.command(require('./commands/serve')(callback));
  }

  args.parse(argv);
};

if (require.main === module) {
  module.exports(process.argv.slice(2));
}
