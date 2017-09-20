'use strict';

var pm = require('./lib/package-manager');

function init (appRoot, appName, options) {
  var useYarn = !!(pm.isGlobalCliUsingYarn() || pm.getYarnVersionIfAvailable());

  var prodDependencies = [
    'hops-express',
    'hops-react',
    'hops-redux',
    'react',
    'react-dom',
    'react-helmet',
    'react-redux',
    'react-router',
    'react-router-dom',
    'redux',
    'redux-thunk'
  ];
  var devDependencies = [
    'hops-build',
    'jest',
    'jest-preset-hops',
    'react-test-renderer'
  ];
  pm.installPackages(prodDependencies, { yarn: useYarn });
  pm.installPackages(devDependencies, { yarn: useYarn, dev: true });

  // fetch template from github/npm and copy files into app folder
}
module.exports = init;
