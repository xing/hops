const fs = require('fs');
const path = require('path');
const validatePackageName = require('validate-npm-package-name');
const { sync: writePkg } = require('write-pkg');

function validateName(name) {
  const validationResult = validatePackageName(name);
  if (!validationResult.validForNewPackages) {
    console.error(
      'Cannot create a project with the name:',
      name,
      'because of the following npm restrictions:'
    );
    if (validationResult.errors) {
      validationResult.errors.forEach((msg) => {
        console.error(msg);
      });
    }
    if (validationResult.warnings) {
      validationResult.warnings.forEach((msg) => {
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

module.exports = function init(options, root) {
  const name = options.projectName;
  const appDir = path.join(root, name);

  validateName(name);
  createDirectory(appDir, name);
  writePkg(path.join(appDir, 'package.json'), {
    name: name,
    version: '1.0.0',
    private: true,
  });

  process.chdir(appDir);
  require('./init').init(root, name, options);
};
