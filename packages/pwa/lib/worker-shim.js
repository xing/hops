'use strict';

require('babel-polyfill');

// This is a webpack alias, defined in mixin.core.js
/* eslint-disable-next-line node/no-missing-require */
var { getConfigAndMixins } = require('hops-worker-config');

(function execute() {
  // This is a webpack alias, defined in mixin.core.js
  /* eslint-disable-next-line node/no-missing-require */
  var entryPoint = require('hops-worker-entry-point');
  if (typeof entryPoint.default === 'function') {
    entryPoint = entryPoint.default;
  }
  entryPoint(getConfigAndMixins().config)(HOPS_ASSETS); // eslint-disable-line no-undef
  if (module.hot) {
    module.hot.accept(require.resolve('hops-worker-entry-point'), function() {
      setTimeout(execute);
    });
  }
})();
