'use strict';

var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');

module.exports = function getConfig (overrides) {
  var config = {
    buildConfig: require.resolve('./build'),
    developConfig: require.resolve('./develop'),
    renderConfig: require.resolve('./render'),
    locations: []
  };
  if (fs.existsSync(appRoot.resolve('package.json'))) {
    Object.assign(config, appRoot.require('package.json').hops);
  }
  if (fs.existsSync(appRoot.resolve('hops.config.js'))) {
    Object.assign(config, appRoot.require('hops.config.js'));
  }
  Object.assign(config, overrides);
  ['buildConfig', 'developConfig', 'renderConfig'].forEach(function (key) {
    if (!path.isAbsolute(config[key])) {
      config[key] = appRoot.resolve(config[key]);
    }
  });
  return config;
};
