'use strict';

module.exports = function getModuleRules (target) {
  return [
    require('./module-rules/babel'),
    require('./module-rules/graphql'),
    require('./module-rules/postcss'),
    require('./module-rules/json'),
    require('./module-rules/file'),
    require('./module-rules/url'),
    require('./module-rules/tpl'),
    require('./module-rules/config')
  ]
    .map(function (config) {
      return config[target] || config.default || config;
    });
};
