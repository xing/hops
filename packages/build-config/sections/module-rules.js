'use strict';

module.exports = function getModuleRules(target) {
  return [
    {
      oneOf: [
        require('./module-rules/babel'),
        require('./module-rules/graphql'),
        require('./module-rules/postcss'),
        require('./module-rules/config'),
        require('./module-rules/tpl'),
        require('./module-rules/url'),
        require('./module-rules/file'),
      ].map(function(config) {
        return config[target] || config.default || config;
      }),
    },
  ];
};
