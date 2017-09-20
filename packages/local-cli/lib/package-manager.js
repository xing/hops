'use strict';

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

function execIgnoreStdError (command, options) {
  var commandToRun = process.platform.indexOf('win') === 0
    ? command + ' 2> NUL'
    : command + ' 2> /dev/null';

  if (options.verbose) {
    console.log('Executing:', commandToRun);
  }
  var result = (options.execSync || execSync)(commandToRun);
  return result.toString('utf-8').trim();
}

function getYarnVersionIfAvailable (options) {
  try {
    return execIgnoreStdError('yarn --version', options);
  } catch (error) {
    return null;
  }
}
module.exports.getYarnVersionIfAvailable = getYarnVersionIfAvailable;

function getNpmVersionIfAvailable (options) {
  try {
    return execIgnoreStdError('npm --version', options);
  } catch (error) {
    return null;
  }
}
module.exports.getNpmVersionIfAvailable = getNpmVersionIfAvailable;

function isGlobalCliUsingYarn (projectPath, options) {
  return fs.existsSync(path.join(projectPath, 'yarn.lock'));
}
module.exports.isGlobalCliUsingYarn = isGlobalCliUsingYarn;

function installPackages (packages, options) {
  var command = null;
  if (options.installCommand) {
    command = options.installCommand.split(' ');
  } else {
    if (options.yarn) {
      command = [
        'yarn',
        'add',
        '--exact'
      ];
      if (options.dev) {
        command.push('--dev');
      }
    } else {
      command = [
        'npm',
        'install',
        '--save-exact'
      ];
      if (options.dev) {
        command.push('--save-dev');
      } else {
        command.push('--save');
      }
    }
    if (options.verbose) {
      command.add('--verbose');
    }
  }
  Array.prototype.push.apply(command, packages);

  try {
    if (options.verbose) {
      console.log('Executing:', command.join(' '));
    }
    (options.execSync || execSync)(command.join(' '), { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(error.message);
    if (options.verbose) {
      console.error(error);
      console.error('Command: "', command.join(' '), 'has failed.');
    }
  }
  return false;
}
module.exports.installPackages = installPackages;

function isPackageInstalled (name) {
  try {
    require.resolve(name);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports.isPackageInstalled = isPackageInstalled;
