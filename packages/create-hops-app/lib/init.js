'use strict';

const { existsSync, unlinkSync, renameSync } = require('fs');
const path = require('path');
const tar = require('tar');
const validatePackageName = require('validate-npm-package-name');
const { sync: writePkg } = require('write-pkg');
const { sync: readPkg } = require('load-json-file');
const pm = require('./package-manager');

function mergePackageManifest(newManifest, oldManifest) {
  return Object.assign({}, newManifest, oldManifest, {
    dependencies: Object.assign(
      newManifest.dependencies,
      oldManifest.dependencies
    ),
    devDependencies: Object.assign(
      newManifest.devDependencies,
      oldManifest.devDependencies
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

function renameDotFiles(root, files) {
  files.forEach((dotFile) => {
    if (existsSync(path.join(root, dotFile))) {
      renameSync(
        path.join(root, dotFile),
        path.join(root, '.' + dotFile.slice(1))
      );
    }
  });
}

function deleteFiles(root, files) {
  files.forEach((fileName) => {
    const file = path.isAbsolute(fileName)
      ? fileName
      : path.join(root, fileName);
    if (existsSync(file)) {
      unlinkSync(file);
    }
  });
}

function init(root, appName, options) {
  const appRoot = path.resolve(root, appName);
  const template = getValidatedTemplateName(options.template, root);
  const pathToPackageManifest = path.resolve(appRoot, 'package.json');
  const oldPackageManifest = readPkg(pathToPackageManifest);
  let tarball = null;

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
        deleteFiles(appRoot, [tarball, 'CHANGELOG.md', 'LICENSE.txt']);
        renameDotFiles(appRoot, ['_gitignore', '_npmrc']);

        writePkg(
          pathToPackageManifest,
          mergePackageManifest(
            readPkg(pathToPackageManifest),
            oldPackageManifest
          )
        );
        pm.installPackages([], null, options);

        console.log('Hooray \\o/');
        console.log('Your project has been successfully created.');
        console.log(
          `You should \`cd ${appName}\` to change into its directory and execute`,
          '`' + (pm.hasBeenInstalledViaYarn(options) ? 'yarn' : 'npm'),
          'start`',
          'to fire up a development server with hot module reloading.'
        );
        console.log(
          'To see a list of available commands through Hops presets execute:',
          pm.hasBeenInstalledViaYarn(options) ? '`yarn hops`' : '`npx hops`'
        );
      })
      .catch((error) => {
        console.error('Error while unpacking tar archive:', tarball);
        console.error(error);
        process.exit(1);
      });
  } else {
    console.error('Could not download tarball for:', template);
    process.exit(1);
  }
}
module.exports = { init };
