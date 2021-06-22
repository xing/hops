'use strict';
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

function isYarnAvailable() {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return true;
  } catch (_) {
    return false;
  }
}
module.exports.isYarnAvailable = isYarnAvailable;

function hasBeenInstalledViaYarn(options) {
  return isYarnAvailable() && !options.npm;
}
module.exports.hasBeenInstalledViaYarn = hasBeenInstalledViaYarn;

function installPackages(packages, type, options) {
  var command = null;

  if (hasBeenInstalledViaYarn(options)) {
    command = packages.length === 0 ? ['yarn', 'install'] : ['yarn', 'add'];
    if (type === 'dev') {
      command.push('--dev');
    }
    // TODO: remove this after PR #1878 has been released
    if (process.version.startsWith('v16')) {
      command.push('--ignore-engines');
    }
  } else {
    command =
      packages.length === 0
        ? // TODO: remove the `--legacy-peer-deps` flag again when
          // react-helmet-async supports react@17 (https://github.com/staylor/react-helmet-async/issues/109)
          ['npm', 'install', '--legacy-peer-deps']
        : ['npm', 'install', type === 'dev' ? '--save-dev' : '--save'];
  }
  if (options.verbose) {
    command.push('--verbose');
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

function isUsingNpxOrNpm(env) {
  const { npm_execpath: execPath = '', _: lastArg = '' } = env;
  const isNpx = execPath.endsWith('npx') || lastArg.endsWith('npx');
  return isNpx || execPath.endsWith('npm') || lastArg.endsWith('npm');
}
module.exports.isUsingNpxOrNpm = isUsingNpxOrNpm;
