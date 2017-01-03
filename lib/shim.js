/**
 * @file lib/browser
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 *
 * @module hops/browser
 */
'use strict';

/**
 * @description instruments and executes actual render function
 *
 * @inner
 * @function
 * @name render
 *
 * @return {undefined}
 */
(function render() {
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
