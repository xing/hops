'use strict';

const {
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
  renameSync,
} = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const tar = require('tar');
const validatePackageName = require('validate-npm-package-name');
const pm = require('./package-manager');

function readPackageManifest(file) {
  return JSON.parse(readFileSync(file).toString('utf-8'));
}

function writePackageManifest(file, manifest) {
  writeFileSync(file, JSON.stringify(manifest, null, 2));
}

function sortObjectKeys(input) {
  const result = {};
  Object.keys(input)
    .sort()
    .forEach(k => {
      result[k] = input[k];
    });
  return result;
}

function mergePackageManifest(oldManifest, newManifest) {
  return Object.assign({}, newManifest, oldManifest, {
    dependencies: sortObjectKeys(
      Object.assign(newManifest.dependencies, oldManifest.dependencies)
    ),
    devDependencies: sortObjectKeys(
      Object.assign(newManifest.devDependencies, oldManifest.devDependencies)
    ),
  });
}

function getValidatedTemplateName(name, root) {
  if (name.indexOf('@') > -1) {
    if (!existsSync(path.resolve(root, name))) {
      return name;
    }
  }
  const validationResult = validatePackageName(name);
  if (
    !(
      validationResult.validForNewPackages ||
      validationResult.validForOldPackages
    )
  ) {
    return path.resolve(root, name);
  } else if (name.indexOf('hops-template') === 0) {
    return name;
  }
  return null;
}

function isCLIInstalledGlobally() {
  try {
    execSync('hops --version', { stdio: 'ignore' });
    return true;
  } catch (_) {
    return false;
  }
}

function init(root, appName, options) {
  const appRoot = path.resolve(root, appName);
  const template = getValidatedTemplateName(options.template, root);
  const pathToPackageManifest = path.resolve(appRoot, 'package.json');
  const oldPackageManifest = readPackageManifest(pathToPackageManifest);
  let tarball = null;
  options.npm = options.npm || !pm.isGlobalCliUsingYarn(appRoot);

  if (template) {
    tarball = pm.getTarball(template, options);
  } else {
    console.error(
      'Could not find a hops-template with the specified name:',
      options.template
    );
    process.exit(1);
  }

  if (tarball) {
    tar
      .extract({
        file: tarball,
        strip: 1,
      })
      .then(() => {
        unlinkSync(tarball);

        ['_gitignore', '_npmrc'].forEach(ignoredFile => {
          if (existsSync(path.join(appRoot, ignoredFile))) {
            renameSync(
              path.join(appRoot, ignoredFile),
              path.join(appRoot, '.' + ignoredFile.slice(1))
            );
          }
        });

        const newPackageManifest = readPackageManifest(pathToPackageManifest);
        writePackageManifest(
          pathToPackageManifest,
          mergePackageManifest(oldPackageManifest, newPackageManifest)
        );
        pm.installPackages([], null, options);

        console.log('Hooray \\o/');
        console.log('Your project has been successfully created.');
        console.log(
          'You should change into its directory and execute',
          '`' +
            (isCLIInstalledGlobally()
              ? 'hops'
              : pm.isGlobalCliUsingYarn(appRoot)
                ? 'yarn'
                : 'npm'),
          'start`',
          'to fire up a development server with hot module reloading.'
        );
        console.log(
          'To see a list of available commands through Hops presets execute:',
          isCLIInstalledGlobally()
            ? '`hops`'
            : (pm.isGlobalCliUsingYarn(appRoot)
                ? '`yarn hops`'
                : '`npx hops@' + options.hopsVersion + '`') +
              ' or install the "hops" package globally.'
        );
      })
      .catch(error => {
        console.error('Error while unpacking tar archive:', tarball);
        console.error(error);
      });
  } else {
    console.error('Could not download tarball for:', template);
    process.exit(1);
  }
}
module.exports = { init };
