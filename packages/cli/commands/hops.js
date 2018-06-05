#!/usr/bin/env node
'use strict';

const resolveCwd = require('resolve-cwd');
const yargs = require('yargs');
const { sync: findUp } = require('find-up');

const createApp = require('../lib/create-app');
const pm = require('../lib/package-manager');

const { version } = require('../package.json');

function globalCLI(argv) {
  return yargs
    .version(version)
    .usage('Usage: $0 <command> [options]')
    .command(
      'init <project-name>',
      'Generates a new project with the specified name'
    )
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
      default: false,
    })
    .example(
      '$0 init my-project',
      'Creates the folder my-project inside the current directory and ' +
        'initializes a sample hops react project inside it.'
    )
    .example(
      '$0 init --template hops-template-react my-project',
      'Creates the folder my-project inside the current directory and ' +
        'initializes a minimal hops example inside it.'
    )
    .help('h')
    .alias('h', 'help')
    .demandCommand()
    .wrap(72)
    .parse(argv);
}

let isInsideHopsProject = false;
try {
  const { dependencies, devDependencies } = require(findUp('package.json'));
  isInsideHopsProject = 'hops' in { ...dependencies, ...devDependencies };
} catch (error) {
  isInsideHopsProject = false;
}

if (isInsideHopsProject) {
  const localCliPath = resolveCwd.silent('hops');
  if (localCliPath) {
    require(localCliPath).run();
  } else {
    console.error(
      'It appears that we are inside a hops project but the dependencies have',
      'not been installed.\n',
      'Please execute "' +
        (pm.isYarnAvailable() ? 'yarn' : 'npm') +
        ' install"',
      'and retry.'
    );
    process.exit(1);
  }
} else {
  const options = globalCLI(process.argv.slice(2));

  if (options._[0] !== 'init') {
    console.error(
      'Looks like we are not inside a hops project or the project misses',
      'the `hops` dependency in its package.json.'
    );
    process.exit(1);
  }

  createApp(options, process.cwd());
}
