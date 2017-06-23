'use strict';

var path = require('path');

var hopsRoot = require('hops-root');

var npmConfig = require('./lib/parse-env')('hops');

function extendConfig (config) {
  if (npmConfig.extends) {
    try {
      require.resolve(npmConfig.extends);
      Object.assign(config, require(npmConfig.extends));
    } catch (e) {
      Object.assign(config, hopsRoot.require(npmConfig.extends));
    }
  }
  return Object.assign(config, npmConfig);
}

function resolvePaths (config) {
  Object.keys(config).filter(function (key) {
    return /(?:config|file|dir|path)s?$/i.test(key);
  })
  .forEach(function (key) {
    config[key] = (function resolve (item) {
      if (typeof item === 'string') {
        return path.isAbsolute(item) ? item : hopsRoot.resolve(item);
      } else if (Array.isArray(item)) {
        return item.map(resolve);
      }
    })(config[key]);
  });
  return config;
}

function freeze (config) {
  return Object.freeze(
    Object.keys(config).sort().reduce(function (result, key) {
      return Object.defineProperty(result, key, {
        value: Object.freeze(config[key]),
        enumerable: true
      });
    }, {})
  );
}

module.exports = freeze(
  resolvePaths(
    extendConfig({
      https: false,
      host: '0.0.0.0',
      port: 8080,
      locations: [],
      browsers: '> 1%, last 2 versions, Firefox ESR',
      moduleDirs: [],
      appDir: '.',
      buildDir: 'build',
      buildConfig: require.resolve('./configs/build'),
      developConfig: require.resolve('./configs/develop'),
      nodeConfig: require.resolve('./configs/node'),
      manifestUtil: require('./lib/manifest-util')
    })
  )
);
