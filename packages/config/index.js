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
  resolve: {},
  loaders: {},
  plugins: {},
  locations: []
};

if (fs.existsSync(hopsRoot.resolve('package.json'))) {
  var pkgConfig = hopsRoot.require('package.json').hops || {};
  if (pkgConfig.extends) {
    try {
      require.resolve(pkgConfig.extends);
      Object.assign(config, require(pkgConfig.extends));
    } catch (e) {
      Object.assign(config, hopsRoot.require(pkgConfig.extends));
    }
  }
  Object.assign(config, pkgConfig);
}

['buildConfig', 'developConfig', 'renderConfig'].forEach(function (key) {
  if (!path.isAbsolute(config[key])) {
    config[key] = hopsRoot.resolve(config[key]);
  }
});
