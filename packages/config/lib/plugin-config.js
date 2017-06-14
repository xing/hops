'use strict';

var pluginConfig = require('..').plugins;

module.exports = function (target, plugins) {
  if (typeof pluginConfig === 'function') {
    return pluginConfig(target, plugins);
  }
  if (pluginConfig[target]) {
    return plugins.concat(pluginConfig[target]);
  }
  return plugins;
};
