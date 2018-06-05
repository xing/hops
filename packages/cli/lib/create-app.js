const fs = require('fs');
const path = require('path');
const resolveCwd = require('resolve-cwd');
const validatePackageName = require('validate-npm-package-name');

const pm = require('./package-manager');

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

module.exports = function init(options, root) {
  const name = options.projectName;
  const appDir = path.join(root, name);

  validateName(name);
  createDirectory(appDir, name);
  writePackageManifest(appDir, name);
  process.chdir(appDir);
  pm.installPackages(['hops@' + options.hopsVersion], 'prod', options);
  require(resolveCwd.silent('hops')).init(root, name, options);
};
