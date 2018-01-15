'use strict';

var path = require('path');

var assign = require('deep-assign');
var root = require('pkg-dir').sync();

var explorer = require('cosmiconfig')('hops', {
  rcExtensions: true,
  stopDir: root,
  sync: true,
});

function getDefaultConfig() {
  return {
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
  };
}

function applyUserConfig(config) {
  var result = explorer.load(process.cwd());
  return assign(config, result ? result.config : {});
}

function applyExtensionConfig(config) {
  var result = Object.assign({}, config);
  if (config.extends) {
    try {
      require.resolve(config.extends);
      assign(result, require(config.extends));
    } catch (_) {
      try {
        assign(result, require(path.join(root, config.extends)));
      } catch (_) {
        console.error('Failed to extend config using', config.extends);
      }
    }
  }
  return result;
}

function applyEnvironmentConfig(config) {
  var env = process.env.HOPS_ENV || process.env.NODE_ENV;
  var result = assign({}, config, config.env && config.env[env]);
  delete result.env;
  return result;
}

function resolvePaths(config) {
  var result = Object.assign({}, config);
  Object.keys(config)
    .filter(function(key) {
      return /(config|file|dir)s?$/i.test(key);
    })
    .forEach(function(key) {
      result[key] = (function resolve(item) {
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
  return result;
}

function normalizeURLs(config) {
  var basePath = config.basePath.replace(/^\/*/, '/').replace(/\/*$/, '');
  var assetPath = config.assetPath.replace(/(^\/*|\/*$)/g, '');
  return Object.assign({}, config, {
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

module.exports = [
  getDefaultConfig,
  applyUserConfig,
  applyExtensionConfig,
  applyEnvironmentConfig,
  resolvePaths,
  normalizeURLs,
].reduce(function(result, step) {
  return step(result);
}, null);
