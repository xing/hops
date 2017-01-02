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
  require('hops-entry-point')();
  if (module.hot) {
    module.hot.accept(
      require.resolve('hops-entry-point'),
      function () {
        setTimeout(render);
      }
    );
  }
})();
