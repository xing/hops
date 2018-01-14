'use strict';

const fs = require('fs');
const path = require('path');

const yargs = require('yargs');
const root = require('pkg-dir').sync();

const packageManifest = require('../package.json');

const binDir = path.join(root, 'node_modules', '.bin');

function findCommands() {
  if (fs.existsSync(binDir)) {
    return fs
      .readdirSync(binDir)
      .filter(command => command.indexOf('hops-') === 0)
      .map(command => path.join(binDir, command))
      .concat(path.join(__dirname, '..', 'commands', 'start.js'));
  } else {
    return [];
  }
}

module.exports = function run(defineCommand, command) {
  const args = yargs
    .version(packageManifest.version)
    .usage('Usage: $0 <command> [options]')
    .help('help')
    .alias('h', 'help')
    .demandCommand();
  const argv = process.argv.slice(2);
  if (defineCommand && command) {
    defineCommand(args);
    argv.unshift(command);
  } else {
    findCommands().forEach(commandPath => require(commandPath)(args));
  }
  args.parse(argv);
};
