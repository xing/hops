const deprecate = require('depd')('hops-config');

deprecate(
  '[DEP0001] hops-config is deprecated. Please use ConfigContext or the withConfig() HOC from hops instead.'
);

module.exports = require('@untool/core').internal.getConfig();
