'use strict';

var fs = require('fs');

var appRoot = require('app-root-path');
var explorer = require('cosmiconfig')('hops');
var npmlog = require('npmlog');


function promiseConfig(defaultConfig) {
  if (defaultConfig) {
    return Promise.resolve(defaultConfig);
  }
  else {
    return explorer.load(appRoot.toString()).then(function (result) {
      return result.config || {};
    });
  }
}


exports.loadConfig = function loadConfig(defaultConfig) {
  return promiseConfig(defaultConfig)
  .then(function (result) {
    var config = Object.assign(
      {
        webpack: Object.assign(
          {
            build: require.resolve('../etc/build'),
            develop: require.resolve('../etc/develop'),
            render: require.resolve('../etc/render')
          },
          result ? result.webpack : {}
        ),
        locations: []
      },
      result
    );
    Object.keys(config.webpack).forEach(function (key) {
      if (!fs.existsSync(config.webpack[key])) {
        config.webpack[key] = appRoot.resolve(config.webpack[key]);
      }
    });
    return config;
  });
};


exports.getDefaultExport = function getDefaultExport(esModule) {
  // eslint-disable-next-line no-underscore-dangle
  return esModule.__esModule ? esModule.default : esModule;
};


exports.log = function log() {
  npmlog.log.apply(npmlog, ['info', 'hops'].concat(Array.from(arguments)));
};


exports.logError = function logError(err) {
  npmlog.log('error', 'hops', err.stack.toString());
};
