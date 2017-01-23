'use strict';

(function render () {
  var handle = require('hops-entry-point');
  // eslint-disable-next-line no-underscore-dangle
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
