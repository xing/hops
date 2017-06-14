'use strict';

var loaderConfig = require('..').loaders;

var loaderDefaultConfigs = {
  js: require('../loaders/babel'),
  css: require('../loaders/postcss'),
  json: require('../loaders/json'),
  file: require('../loaders/file'),
  url: require('../loaders/url'),
  tpl: require('../loaders/tpl')
};

module.exports = function getLoaderConfig (target) {
  var configs;
  if (typeof loaderConfig === 'function') {
    configs = loaderConfig(target, loaderDefaultConfigs);
  } else {
    configs = Object.assign({}, loaderDefaultConfigs, loaderConfig);
  }
  return Object.keys(configs).map(function (key) {
    return configs[key][target] || configs[key].default || configs[key];
  });
};
