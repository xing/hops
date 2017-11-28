#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;
var resolveCwd = require('resolve-cwd');
var validatePackageName = require('validate-npm-package-name');

var packageManifest = require('./package.json');

var getLocalCliPath = function() {
  try {
    return resolveCwd('hops-local-cli');
  } catch (error) {
    return null;
  }
};

var PACKAGES_TO_INSTALL = ['hops-local-cli'];

function globalCLI(argv) {
  return require('yargs')
    .version(packageManifest.version)
    .usage('Usage: $0 <command> [options]')
    .command(
      'init <project-name>',
      'Generates a new project with the ' + 'specified name'
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
      describe: 'Which version (or npm dist-tag) of hops-local-cli to use',
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
  var validationResult = validatePackageName(name);
  if (!validationResult.validForNewPackages) {
    console.error(
      'Cannot create a project with the name:',
      name,
      'because of the following npm restrictions:'
    );
    if (validationResult.errors) {
      validationResult.errors.forEach(function(msg) {
        console.error(msg);
      });
    }
    if (validationResult.warnings) {
      validationResult.warnings.forEach(function(msg) {
        console.warn(msg);
      });
    }
    process.exit(1);
  }
}

function createDirectory(root) {
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

function writePackageManifest(root) {
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

function isYarnAvailable() {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function installPackages(packages, options) {
  var command = null;
  var shouldUseYarn = isYarnAvailable() && !options.npm;
  if (shouldUseYarn) {
    command = ['yarn', 'add', '--exact'];
  } else {
    command = ['npm', 'install', '--save', '--save-exact'];
  }
  if (options.verbose) {
    command.push('--verbose');
  }
  Array.prototype.push.apply(command, packages);

  try {
    if (options.verbose) {
      console.log('Executing command: "', command.join(' '), '"');
    }
    execSync(command.join(' '), { stdio: 'inherit' });
  } catch (error) {
    console.error(error.message);
    if (options.verbose) {
      console.error(error);
      console.error('Command: "', command.join(' '), '" has failed.');
    }
    process.exit(1);
  }
}

var localCliPath = getLocalCliPath();

var isInsideHopsProject = false;
try {
  var manifest = require(path.resolve(process.cwd(), 'package.json'));
  var dependencies = Object.keys(manifest.dependencies || {}).concat(
    Object.keys(manifest.devDependencies || {})
  );
  isInsideHopsProject = dependencies.indexOf('hops-local-cli') > -1;
} catch (error) {
  isInsideHopsProject = false;
}

if (isInsideHopsProject) {
  if (localCliPath) {
    require(localCliPath).run();
  } else {
    console.error(
      'It appears that we are inside a hops project but the dependencies have',
      'not been installed.\n',
      'Please execute "' + (isYarnAvailable() ? 'yarn' : 'npm') + ' install"',
      'and retry.'
    );
    process.exit(1);
  }
} else {
  var options = globalCLI(process.argv.slice(2));
  var name = options.projectName;
  var root = process.cwd();
  var versionedPackages = PACKAGES_TO_INSTALL.map(function(name) {
    return name + '@' + options.hopsVersion;
  });

  validateName(name);
  createDirectory(path.resolve(root, name));
  writePackageManifest(path.resolve(root, name));
  process.chdir(path.resolve(root, name));
  installPackages(versionedPackages, options);
  require(getLocalCliPath()).init(root, name, options);
}
