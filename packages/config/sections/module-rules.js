'use strict';

module.exports = function getModuleRules (target) {
  return [
    require('../loaders/babel'),
    require('../loaders/postcss'),
    require('../loaders/json'),
    require('../loaders/file'),
    require('../loaders/url'),
    require('../loaders/tpl'),
    require('../loaders/config')
  ]
  .map(function (config) {
    return config[target] || config.default || config;
  });
};
