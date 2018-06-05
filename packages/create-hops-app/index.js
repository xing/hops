#!/usr/bin/env node
'use strict';

const path = require('path');
const yargs = require('yargs');
const createApp = require('hops/lib/create-app');

const { version } = require('./package.json');

const { npm_execpath: execPath = '', _: lastArg = '' } = process.env;
const isNpx = execPath.endsWith('npx') || lastArg.endsWith('npx');
const isNpm = isNpx || execPath.endsWith('npm') || lastArg.endsWith('npm');

const options = yargs
  .version(version)
  .usage('Usage: $0 <project-name> [options]')
  .option('template', {
    type: 'string',
    describe:
      'Use this with the npm package name of a template to initialize with ' +
      'a different template',
    default: 'hops-template-react',
  })
  .option('hops-version', {
    type: 'string',
    describe: 'Which version (or npm dist-tag) of hops to use',
    default: 'latest',
  })
  .option('verbose', {
    type: 'boolean',
    describe: 'Increase verbosity of command',
    default: false,
  })
  .option('npm', {
    type: 'boolean',
    describe: 'Force usage of `npm` instead of yarn',
    default: isNpm,
  })
  .example(
    '$0 my-project',
    'Creates the folder my-project inside the current directory and ' +
      'initializes a sample hops react project inside it.'
  )
  .example(
    '$0 --template hops-template-minimal my-project',
    'Creates the folder my-project inside the current directory and ' +
      'initializes a minimal hops example inside it.'
  )
  .help('h')
  .alias('h', 'help')
  .wrap(72)
  .parse(process.argv);

const argv = options._.filter(a => !path.isAbsolute(a));
options.projectName = argv[argv.length - 1];

if (!options.projectName) {
  console.error('No project-name given!');
  yargs.showHelp();
  process.exit(1);
} else {
  createApp(options, process.cwd());
}
