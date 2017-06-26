'use strict';

var path = require('path');

var hopsRoot = require('hops-root');

var npmConfig = require('./lib/parse-env')('hops');
var manifestUtil = require('./lib/manifest-util');

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
    return /(?:config|script|file|dir)s?$/i.test(key);
  })
  .forEach(function (key) {
    config[key] = (function resolve (item) {
      if (typeof item === 'string') {
        return path.isAbsolute(item) ? item : hopsRoot.resolve(item);
      } else if (Array.isArray(item)) {
        return item.map(resolve);
      } else {
        return config[key];
      }
    })(config[key]);
  });
  return config;
}

function normalizeURLs (config) {
  return Object.assign(config, {
    locations: config.locations.map(function (location) {
      return location.replace(/\/*$/, '').replace(/^\/*/, '/');
    }),
    basePath: config.basePath.replace(/^\/*/, '/').replace(/\/*$/, ''),
    assetPath: config.assetPath.replace(/(?:^\/*|\/*$)/g, '')
  });
}

function freeze (config) {
  return Object.freeze(
    Object.keys(config).reduce(function (result, key) {
      var descriptor = { enumerable: true };
      if (typeof config[key] === 'function') {
        descriptor.get = function () {
          return Object.freeze(config[key]());
        };
      } else {
        descriptor.value = Object.freeze(config[key]);
      }
      return Object.defineProperty(result, key, descriptor);
    }, {})
  );
}

module.exports = freeze(
  normalizeURLs(
    resolvePaths(
      extendConfig({
        https: false,
        host: '0.0.0.0',
        port: 8080,
        locations: [],
        basePath: '/',
        assetPath: '/',
        browsers: '> 1%, last 2 versions, Firefox ESR',
        moduleDirs: [],
        appDir: '.',
        buildDir: 'build',
        buildConfig: require.resolve('./configs/build'),
        developConfig: require.resolve('./configs/develop'),
        nodeConfig: require.resolve('./configs/node'),
        manifest: manifestUtil.getManifestScript,
        assets: manifestUtil.getAssetURLs
      })
    )
  )
);
