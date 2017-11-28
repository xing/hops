'use strict';

var fs = require('fs');
var path = require('path');
var tar = require('tar');
var validatePackageName = require('validate-npm-package-name');
var pm = require('./lib/package-manager');

function readPackageManifest(file) {
  return JSON.parse(fs.readFileSync(file).toString('utf-8'));
}

function writePackageManifest(file, manifest) {
  fs.writeFileSync(file, JSON.stringify(manifest, null, 2));
}

function sortObjectKeys(input) {
  var result = {};
  Object.keys(input)
    .sort()
    .forEach(function(k) {
      result[k] = input[k];
    });
  return result;
}

function mergePackageManifest(oldManifest, newManifest) {
  return Object.assign({}, newManifest, oldManifest, {
    dependencies: sortObjectKeys(
      Object.assign(newManifest.dependencies, oldManifest.dependencies)
    ),
  });
}

function getValidatedTemplateName(name, root) {
  if (name.indexOf('@') > -1) {
    if (!fs.existsSync(path.resolve(root, name))) {
      return name;
    }
  }
  var validationResult = validatePackageName(name);
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

function init(root, appName, options) {
  var appRoot = path.resolve(root, appName);
  var template = getValidatedTemplateName(options.template, root);
  var pathToPackageManifest = path.resolve(appRoot, 'package.json');
  var oldPackageManifest = readPackageManifest(pathToPackageManifest);
  var tarball = null;
  options.npm = options.npm || !pm.isGlobalCliUsingYarn(appRoot, options);

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
      .then(function() {
        fs.unlinkSync(tarball);
        if (fs.existsSync(path.join(appRoot, '_gitignore'))) {
          fs.renameSync(
            path.join(appRoot, '_gitignore'),
            path.join(appRoot, '.gitignore')
          );
        }
        var newPackageManifest = readPackageManifest(pathToPackageManifest);
        writePackageManifest(
          pathToPackageManifest,
          mergePackageManifest(oldPackageManifest, newPackageManifest)
        );
        pm.installPackages(options);

        console.log('Hooray \\o/');
        console.log('Your project has been successfully created.');
        console.log(
          'You should change into its directory and execute "hops" to see a list',
          'of available commands.'
        );
      })
      .catch(function(error) {
        console.error('Error while unpacking tar archive:', tarball);
        console.error(error);
      });
  } else {
    console.error('Could not download tarball for:', template);
    process.exit(1);
  }
}
module.exports = init;
