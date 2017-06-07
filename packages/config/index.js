'use strict';

var fs = require('fs');
var path = require('path');

var hopsRoot = require('hops-root');

var config = module.exports = {
  buildConfig: require.resolve('./configs/build'),
  developConfig: require.resolve('./configs/develop'),
  renderConfig: require.resolve('./configs/render'),
  browsers: '> 5%, last 1 version',
  buildDir: 'build',
  locations: []
};

if (fs.existsSync(hopsRoot.resolve('package.json'))) {
  var pkgConfig = hopsRoot.require('package.json').hops || {};
  if (pkgConfig.extend) {
    try {
      require.resolve(pkgConfig.extend);
      Object.assign(config, require(pkgConfig.extend));
    } catch (e) {
      Object.assign(config, hopsRoot.require(pkgConfig.extend));
    }
  }
  Object.assign(config, pkgConfig);
}

['buildConfig', 'developConfig', 'renderConfig'].forEach(function (key) {
  if (!path.isAbsolute(config[key])) {
    config[key] = hopsRoot.resolve(config[key]);
  }
});
