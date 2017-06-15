'use strict';

var path = require('path');
var url = require('url');

var hopsRoot = require('hops-root');

// https://docs.npmjs.com/misc/scripts#special-packagejson-config-object
var config = module.exports = {
  https: process.env.npm_package_config_https || false,
  host: process.env.npm_package_config_host || '0.0.0.0',
  port: process.env.npm_package_config_port || 8080,
  buildDir: process.env.npm_package_config_builddir || 'build',
  buildConfig: process.env.npm_package_config_build ||
    require.resolve('./configs/build'),
  developConfig: process.env.npm_package_config_develop ||
    require.resolve('./configs/develop'),
  renderConfig: process.env.npm_package_config_render ||
    require.resolve('./configs/render'),
  browsers: '> 5%, last 1 version',
  resolve: {},
  loaders: {},
  plugins: {},
  devServer: {},
  locations: []
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

config.address = url.format({
  protocol: config.https ? 'https' : 'http',
  hostname: config.host,
  port: config.port
});
