'use strict';

var fs = require('fs');
var path = require('path');

var hopsRoot = require('hops-root');

var config = module.exports = {
  buildConfig: require.resolve('./configs/build'),
  developConfig: require.resolve('./configs/develop'),
  renderConfig: require.resolve('./configs/render'),
  locations: []
};

if (fs.existsSync(hopsRoot.resolve('package.json'))) {
  Object.assign(config, hopsRoot.require('package.json').hops);
}

if (fs.existsSync(hopsRoot.resolve('hops.config.js'))) {
  Object.assign(config, hopsRoot.require('hops.config.js'));
}

['buildConfig', 'developConfig', 'renderConfig'].forEach(function (key) {
  if (!path.isAbsolute(config[key])) {
    config[key] = hopsRoot.resolve(config[key]);
  }
});
