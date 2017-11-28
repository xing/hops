'use strict';

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

function execIgnoreStdError(command, options) {
  var commandToRun =
    process.platform.indexOf('win') === 0
      ? command + ' 2> NUL'
      : command + ' 2> /dev/null';

  if (options.verbose) {
    console.log('Executing:', commandToRun);
  }
  var result = (options.execSync || execSync)(commandToRun);
  return result.toString('utf-8').trim();
}

function isGlobalCliUsingYarn(projectPath, options) {
  return fs.existsSync(path.join(projectPath, 'yarn.lock'));
}
module.exports.isGlobalCliUsingYarn = isGlobalCliUsingYarn;

function installPackages(options) {
  var command = options.npm ? 'npm install' : 'yarn install';
  try {
    if (options.verbose) {
      console.log('Executing:', command);
    }
    (options.execSync || execSync)(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(error.message);
    if (options.verbose) {
      console.error(error);
    }
  }
  return false;
}
module.exports.installPackages = installPackages;

function getTarball(name, options) {
  var command = 'npm pack ' + name;
  try {
    return execIgnoreStdError(command, options);
  } catch (error) {
    console.error(error.message);
    if (options.verbose) {
      console.error(error);
    }
    return null;
  }
}
module.exports.getTarball = getTarball;

function isPackageInstalled(name) {
  try {
    require.resolve(name);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports.isPackageInstalled = isPackageInstalled;
