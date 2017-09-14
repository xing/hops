'use strict';

var path = require('path');

var root = require('pkg-dir').sync(process.cwd());

var manifestUtil = require('./lib/manifest-util');

var userConfig = require('./lib/parse-env')('hops');
try {
  require.resolve(path.join(root, 'package.json'));
  var packageConfig = require(path.join(root, 'package.json')).config.hops;
  userConfig = Object.assign({}, packageConfig, userConfig);
} catch (_) {}

function extendConfig (config) {
  if (userConfig.extends) {
    try {
      require.resolve(userConfig.extends);
      Object.assign(config, require(userConfig.extends));
    } catch (_) {
      Object.assign(config, require(path.join(root, userConfig.extends)));
    }
  }
  return Object.assign(config, userConfig);
}

function resolvePaths (config) {
  Object.keys(config).filter(function (key) {
    return /(config|file|dir)s?$/i.test(key);
  })
  .forEach(function (key) {
    config[key] = (function resolve (item) {
      if (typeof item === 'string') {
        return path.isAbsolute(item) ? item : path.join(root, item);
      } else if (Array.isArray(item)) {
        return item.map(resolve);
      } else {
        return item;
      }
    })(config[key]);
  });
  return config;
}

function normalizeURLs (config) {
  return Object.assign(config, {
    locations: config.locations.map(function (location) {
      return location.replace(/\/*$/, '').replace(/^\/*/, '/');
    }).sort(function (locationA, locationB) {
      return locationB.length - locationA.length;
    }),
    basePath: config.basePath.replace(/^\/*/, '/').replace(/\/*$/, ''),
    assetPath: config.assetPath.replace(/(^\/*|\/*$)/g, '')
  });
}

function freeze (config) {
  return Object.freeze(
    Object.keys(config).reduce(function (result, key) {
      var descriptor = { enumerable: true };
      if (typeof config[key] === 'function') {
        descriptor.get = config[key];
      } else {
        descriptor.value = config[key];
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
        basePath: '',
        assetPath: '',
        browsers: '> 1%, last 2 versions, Firefox ESR',
        moduleDirs: [],
        appDir: '.',
        buildDir: 'build',
        cacheDir: 'node_modules/.cache/hops',
        buildConfig: require.resolve('./configs/build'),
        developConfig: require.resolve('./configs/develop'),
        nodeConfig: require.resolve('./configs/node'),
        manifest: manifestUtil.getManifest,
        assets: manifestUtil.getAssets
      })
    )
  )
);
