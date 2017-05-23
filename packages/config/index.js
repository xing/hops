'use strict';

var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');

var config = module.exports = {
  buildConfig: require.resolve('./configs/build'),
  developConfig: require.resolve('./configs/develop'),
  renderConfig: require.resolve('./configs/render'),
  locations: []
};

if (fs.existsSync(appRoot.resolve('package.json'))) {
  Object.assign(config, appRoot.require('package.json').hops);
}

if (fs.existsSync(appRoot.resolve('hops.config.js'))) {
  Object.assign(config, appRoot.require('hops.config.js'));
}

['buildConfig', 'developConfig', 'renderConfig'].forEach(function (key) {
  if (!path.isAbsolute(config[key])) {
    config[key] = appRoot.resolve(config[key]);
  }
});
