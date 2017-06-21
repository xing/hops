'use strict';

require('babel-polyfill');

(function render () {
  var handle = require('hops-entry-point');
  if (handle.__esModule) {
    handle = handle.default;
  }
  handle();

  if (module.hot) {
    module.hot.accept(
      require.resolve('hops-entry-point'),
      function () {
        setTimeout(render);
      }
    );
  }
})();
