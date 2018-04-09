#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const resolveCwd = require('resolve-cwd').silent;
const validatePackageName = require('validate-npm-package-name');

const pm = require('../lib/package-manager');
const packageManifest = require('../package.json');

const getLocalCliPath = () =>
  resolveCwd('hops-local-cli') || resolveCwd('hops');

function globalCLI(argv) {
  return require('yargs')
    .version(packageManifest.version)
    .usage('Usage: $0 <command> [options]')
    .command(
      'init <project-name>',
      'Generates a new project with the specified name'
    )
    .option('template', {
      type: 'string',
      describe:
        'Use this with the npm package name of a template to ' +
        'initialize with a different template',
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
      '$0 init --template hops-template-minimal my-project',
      'Creates the folder my-project inside the current directory and ' +
        'initializes a minimal hops example inside it.'
    )
    .help('h')
    .alias('h', 'help')
    .demandCommand()
    .wrap(72)
    .parse(argv);
}

function validateName(name) {
  const validationResult = validatePackageName(name);
  if (!validationResult.validForNewPackages) {
    console.error(
      'Cannot create a project with the name:',
      name,
      'because of the following npm restrictions:'
    );
    if (validationResult.errors) {
      validationResult.errors.forEach(msg => {
        console.error(msg);
      });
    }
    if (validationResult.warnings) {
      validationResult.warnings.forEach(msg => {
        console.warn(msg);
      });
    }
    process.exit(1);
  }
}

function createDirectory(root, name) {
  if (fs.existsSync(root)) {
    console.error(
      'A directory with the name:',
      name,
      'already exists in:',
      process.cwd(),
      '\nPlease remove this directory or choose a different project-name.'
    );
    process.exit(1);
  }
  fs.mkdirSync(root);
}

function writePackageManifest(root, name) {
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(
      {
        name: name,
        version: '1.0.0',
        private: true,
      },
      null,
      2
    )
  );
}

let isInsideHopsProject = false;
try {
  const hopsRoot = require('pkg-dir').sync();
  const manifest = require(path.join(hopsRoot, 'package.json'));
  const dependencies = [
    ...Object.keys(manifest.dependencies || {}),
    ...Object.keys(manifest.devDependencies || {}),
  ];
  isInsideHopsProject = ['hops', 'hops-local-cli'].some(
    dependency => dependencies.indexOf(dependency) > -1
  );
} catch (error) {
  isInsideHopsProject = false;
}

if (isInsideHopsProject) {
  const localCliPath = getLocalCliPath();
  if (localCliPath) {
    require(localCliPath).run();
  } else {
    console.error(
      'It appears that we are inside a hops project but the dependencies have',
      'not been installed.\n',
      `Please execute ${pm.isYarnAvailable() ? 'yarn' : 'npm'} install"`,
      'and retry.'
    );
    process.exit(1);
  }
} else {
  const options = globalCLI(process.argv.slice(2));
  const name = options.projectName;
  const root = process.cwd();

  if (options._[0] !== 'init') {
    console.error(
      'Looks like we are not inside a hops project or the project misses',
      'either `hops` or `hops-local-cli` in its `devDependencies` or',
      '`dependencies`.'
    );
    process.exit(1);
  }

  if (options._[0] !== 'init') {
    console.error(
      'Looks like we are not inside a hops project or the project misses',
      'either `hops` or `hops-local-cli` in its `devDependencies` or',
      '`dependencies`.'
    );
    process.exit(1);
  }

  validateName(name);
  createDirectory(path.join(root, name), name);
  writePackageManifest(path.join(root, name), name);
  process.chdir(path.join(root, name));
  pm.installPackages([`hops@${options.hopsVersion}`], 'dev', options);
  require(getLocalCliPath()).init(root, name, options);
}
