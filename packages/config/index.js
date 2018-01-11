'use strict';

var path = require('path');

var root = require('pkg-dir').sync(process.cwd());

var parseEnv = require('./lib/parse-env');

function getNpmConfig() {
  var npmConfig = parseEnv('hops');
  if (!Object.keys(npmConfig).length) {
    try {
      require.resolve(path.join(root, 'package.json'));
      npmConfig = require(path.join(root, 'package.json')).config.hops;
    } catch (_) {}
  }
  return npmConfig;
}

function extendConfig(config) {
  var npmConfig = getNpmConfig();
  if (npmConfig.extends) {
    try {
      require.resolve(npmConfig.extends);
      Object.assign(config, require(npmConfig.extends));
    } catch (_) {
      Object.assign(config, require(path.join(root, npmConfig.extends)));
    }
  }
  Object.assign(
    config,
    npmConfig,
    npmConfig.env && npmConfig.env[process.env.NODE_ENV]
  );
  delete config.env;
  return config;
}

function resolvePaths(config) {
  Object.keys(config)
    .filter(function(key) {
      return /(config|file|dir)s?$/i.test(key);
    })
    .forEach(function(key) {
      config[key] = (function resolve(item) {
        if (typeof item === 'string') {
          if (item.indexOf('<') === 0) {
            item = item.replace(/^(?:<([^>]+)>)(.*)/, function() {
              return path.join(config[arguments[1]], arguments[2]);
            });
          }
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

function normalizeURLs(config) {
  var basePath = config.basePath.replace(/^\/*/, '/').replace(/\/*$/, '');
  var assetPath = config.assetPath.replace(/(^\/*|\/*$)/g, '');
  return Object.assign(config, {
    locations: config.locations
      .map(function(location) {
        return basePath + location.replace(/\/*$/, '').replace(/^\/*/, '/');
      })
      .sort(function(locationA, locationB) {
        return locationB.length - locationA.length;
      }),
    basePath: basePath,
    assetPath: assetPath,
  });
}

module.exports = [extendConfig, resolvePaths, normalizeURLs].reduce(
  function(result, step) {
    return step(Object.assign({}, result));
  },
  {
    https: false,
    host: '0.0.0.0',
    port: 8080,
    locations: [],
    basePath: '',
    assetPath: '',
    browsers: '> 1%, last 2 versions, Firefox ESR',
    node: 'current',
    envVars: { HOPS_MODE: 'dynamic' },
    moduleDirs: [],
    appDir: '.',
    buildDir: 'build',
    cacheDir: 'node_modules/.cache/hops',
  }
);
