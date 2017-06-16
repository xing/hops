'use strict';

var path = require('path');
var url = require('url');

var hopsRoot = require('hops-root');

// https://docs.npmjs.com/misc/scripts#special-packagejson-config-object
function getEnvConfig (prop, fallback) {
  var envVar = 'npm_package_config_' + prop;
  return (envVar in process.env) ? process.env[envVar] : fallback;
}

var config = module.exports = {
  https: getEnvConfig('https', false),
  host: getEnvConfig('host', '0.0.0.0'),
  port: getEnvConfig('port', 8080),
  locations: getEnvConfig('locations', []),
  buildDir: getEnvConfig('buildDir', 'build'),
  browsers: getEnvConfig('browsers', '> 1%, last 2 versions, Firefox ESR'),
  buildConfig: getEnvConfig('build', require.resolve('./configs/build')),
  developConfig: getEnvConfig('develop', require.resolve('./configs/develop')),
  renderConfig: getEnvConfig('render', require.resolve('./configs/render')),
  resolve: {},
  loaders: {},
  plugins: {},
  devServer: {},
  server: null
};

if (process.env.npm_package_config_extends) {
  var baseFile = process.env.npm_package_config_extends;
  try {
    require.resolve(baseFile);
    Object.assign(config, require(baseFile));
  } catch (e) {
    Object.assign(config, hopsRoot.require(baseFile));
  }
}

['buildConfig', 'developConfig', 'renderConfig'].forEach(function (key) {
  if (!path.isAbsolute(config[key])) {
    config[key] = hopsRoot.resolve(config[key]);
  }
});

if (typeof config.locations === 'string') {
  config.locations = config.locations.split(/,\s?/).filter(function (location) {
    return !!location;
  });
}

config.address = url.format({
  protocol: config.https ? 'https' : 'http',
  hostname: config.host,
  port: config.port
});
