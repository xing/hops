'use strict';

// require('babel-polyfill');

var { getConfig } = require('hops-worker-config');

(function execute() {
  var entryPoint = require('hops-worker-entry-point');
  if (typeof entryPoint.default === 'function') {
    entryPoint = entryPoint.default;
  }
  entryPoint(getConfig())(HOPS_ASSETS); // eslint-disable-line no-undef
  if (module.hot) {
    module.hot.accept(require.resolve('hops-worker-entry-point'), function() {
      setTimeout(execute);
    });
  }
})();
