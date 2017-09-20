'use strict';

require('babel-polyfill');

(function render () {
  var entryPoint = require('hops-entry-point');
  if (entryPoint.__esModule) {
    entryPoint = entryPoint.default;
  }
  entryPoint();
  if (module.hot) {
    module.hot.accept(
      require.resolve('hops-entry-point'),
      function () {
        setTimeout(render);
      }
    );
  }
})();
