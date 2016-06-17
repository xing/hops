/**
 * @file lib/shim
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 *
 * @module hops/shim
 */

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
  var mainRender = require('hops-main');
  if (module.hot) {
    mainRender = mainRender.default || mainRender;
    var mountPoint = mainRender();
    module.hot.accept(
      require.resolve('hops-main'),
      function () {
        ReactDOM.unmountComponentAtNode(mountPoint);
        setTimeout(render);
      }
    );
  }
})();
