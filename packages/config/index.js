'use strict';

var path = require('path');
var url = require('url');

var hopsRoot = require('hops-root');

function extendWithNPMConfig (config) {
  if (process.env.npm_package_config_extends) {
    var baseFile = process.env.npm_package_config_extends;
    try {
      require.resolve(baseFile);
      Object.assign(config, require(baseFile));
    } catch (e) {
      Object.assign(config, hopsRoot.require(baseFile));
    }
  }
  return config;
}

function overrideWithNPMConfig (config) {
  [
    'https',
    'host',
    'port',
    'locations',
    'browsers',
    'modules',
    'buildDir',
    'buildConfig',
    'developConfig',
    'renderConfig'
  ]
  .forEach(function (key) {
    var envVar = 'npm_package_config_' + key;
    if (envVar in process.env) {
      config[key] = process.env[envVar];
    }
  });
  return config;
}

function splitStrings (config) {
  [
    'locations',
    'modules'
  ]
  .forEach(function (key) {
    if (typeof config[key] === 'string') {
      config[key] = config[key].split(/,\s?/).filter(function (item) {
        return !!item;
      });
    }
  });
  return config;
}

function resolvePaths (config) {
  [
    'modules',
    'buildDir',
    'buildConfig',
    'developConfig',
    'renderConfig'
  ]
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
      splitStrings(
        overrideWithNPMConfig(
          extendWithNPMConfig({
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
    )
  )
);
