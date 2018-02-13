'use strict';

require('babel-polyfill');

(function execute() {
  var entryPoint = require('hops-worker-entry-point');
  if (
    typeof entryPoint !== 'function' &&
    typeof entryPoint.default === 'function'
  ) {
    entryPoint = entryPoint.default;
  }
  entryPoint(HOPS_ASSETS); // eslint-disable-line no-undef
  if (module.hot) {
    module.hot.accept(require.resolve('hops-worker-entry-point'), function() {
      setTimeout(execute);
    });
  }
})();
