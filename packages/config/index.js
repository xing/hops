'use strict';

var path = require('path');
var url = require('url');

var hopsRoot = require('hops-root');

var npmConfig = require('./lib/parse-env')('hops');

function applyNPMConfig (config) {
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
    return /(^modules$|Config$|Dir$|Path$)/.test(key);
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

function addConstants (config) {
  return Object.assign(config, {
    address: url.format({
      protocol: config.https ? 'https' : 'http',
      hostname: config.host,
      port: config.port
    }),
    appDir: hopsRoot.toString()
  });
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
  addConstants(
    resolvePaths(
      applyNPMConfig({
        https: false,
        host: '0.0.0.0',
        port: 8080,
        locations: [],
        browsers: '> 1%, last 2 versions, Firefox ESR',
        modules: [],
        buildDir: hopsRoot.resolve('build'),
        buildConfig: require.resolve('./configs/build'),
        developConfig: require.resolve('./configs/develop'),
        renderConfig: require.resolve('./configs/render'),
        resolve: {},
        loaders: {},
        plugins: {},
        devServer: {},
        bootstrap: function () {},
        teardown: function () {}
      })
    )
  )
);
