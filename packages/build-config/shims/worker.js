'use strict';

require('babel-polyfill');

(function execute() {
  var entryPoint = require('hops-worker-entry-point');
  if (entryPoint.__esModule) {
    entryPoint = entryPoint.default;
  }
  entryPoint(HOPS_ASSETS); // eslint-disable-line no-undef
  if (module.hot) {
    module.hot.accept(require.resolve('hops-worker-entry-point'), function() {
      setTimeout(execute);
    });
  }
})();
