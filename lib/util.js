'use strict';

var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var npmlog = require('npmlog');

exports.mergeConfig = function mergeConfig (base, ext) {
  return Object.assign(base || {}, ext, {
    webpack: Object.assign(base ? base.webpack : {}, ext && ext.webpack)
  });
};

exports.getConfig = function readConfig (overrides) {
  var config = {
    webpack: {
      build: require.resolve('../etc/build'),
      develop: require.resolve('../etc/develop'),
      render: require.resolve('../etc/render')
    },
    locations: []
  };
  if (fs.existsSync(appRoot.resolve('package.json'))) {
    exports.mergeConfig(config, appRoot.require('package.json').hops);
  }
  if (fs.existsSync(appRoot.resolve('hops.config.js'))) {
    exports.mergeConfig(config, appRoot.require('hops.config.js'));
  }
  exports.mergeConfig(config, overrides);
  Object.keys(config.webpack).forEach(function (key) {
    if (!path.isAbsolute(config.webpack[key])) {
      config.webpack[key] = appRoot.resolve(config.webpack[key]);
    }
  });
  return config;
};

exports.log = function log () {
  npmlog.log.apply(npmlog, ['info', 'hops'].concat(Array.from(arguments)));
};

exports.logError = function logError (err) {
  npmlog.log('error', 'hops', err.stack.toString());
};
