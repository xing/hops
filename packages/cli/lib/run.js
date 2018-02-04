'use strict';

var fs = require('fs');
var path = require('path');

var yargs = require('yargs');
var root = require('pkg-dir').sync();

var packageManifest = require('../package.json');

var binDir = path.join(root, 'node_modules', '.bin');

function findCommands() {
  if (fs.existsSync(binDir)) {
    return fs
      .readdirSync(binDir)
      .filter(function(command) {
        return command.indexOf('hops-') === 0;
      })
      .map(function(command) {
        return path.join(binDir, command);
      })
      .concat(path.join(__dirname, '..', 'commands', 'start.js'));
  } else {
    return [];
  }
}

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
