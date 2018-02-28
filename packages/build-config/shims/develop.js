'use strict';

require('babel-polyfill');

(function render() {
  var entryPoint = require('hops-entry-point');
  if (
    typeof entryPoint !== 'function' &&
    typeof entryPoint.default === 'function'
  ) {
    entryPoint = entryPoint.default;
  }
  entryPoint();
  if (module.hot) {
    module.hot.accept(require.resolve('hops-entry-point'), function() {
      setTimeout(render);
    });
  }
})();
