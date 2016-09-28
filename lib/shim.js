/**
 * @file lib/shim
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 *
 * @module hops/shim
 */
'use strict';

require('core-js/es6/object');
require('core-js/es6/promise');

var ReactDOM = require('react-dom');

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
  var mainRender = require('hops-entry-point');
  var mountPoint = mainRender.default ? mainRender.default() : mainRender();
  if (module.hot) {
    module.hot.accept(
      require.resolve('hops-entry-point'),
      function () {
        ReactDOM.unmountComponentAtNode(mountPoint);
        setTimeout(render);
      }
    );
  }
})();
