/**
 * @module lib/browser
 * @file lib/browser
 * @name lib/browser
 * @exports render
 * @exports register
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 */

/* istanbul ignore if */
if (!global.Object.assign) {
  global.Object.assign = require('babel-runtime/core-js/object/assign').default;
}
/* istanbul ignore if */
if (!global.Promise) {
  global.Promise = require('babel-runtime/core-js/promise').default;
}

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

var defaults = require('./defaults');

/**
 * hops' main function:
 *
 * * creates a [Redux](https://github.com/reactjs/redux) store
 * * sets up [React Router](https://github.com/reactjs/react-router)
 * * handles rendering both in the browser and in node.
 *
 * Using it is mandatory and its output must be the default export of
 * your main module. And it's a little magic.
 * In addition to `routes` and `reducers`, an html `mountPoint`
 * selector and some othes may be passed as options.
 *
 * @public
 * @type Function
 * @param  {Object} overrides - overrides something
 * @param  {String} [overrides.mountPoint] - querySelector of mount point
 * @param  {String} [overrides.title] - title of app
 * @param  {Route} [overrides.routes] - routes of app
 * @param  {Object} [overrides.initialState] - global initial state
 * @param  {History} [overrides.history] - browser history
 * @return {Function} returns a function to render the app
 *                            inside the hops wrapper if not `module.hot` execute
 * @example
 * import { render } from 'hops';
 * import { routes } from './routes';
 * export default render({ routes });
 */
exports.render = function(overrides) {
  /**
   * return function
   * @return {HTMLElement} the mount point
   */
  function render() {
    var options = Object.assign({}, defaults, overrides);
    var store = options.createStore(options);
    var mountPoint = document.querySelector(options.mountPoint);
    ReactDOM.render(
      React.createElement(ReactRedux.Provider, {
        store: store
      },
        React.createElement(ReactRouter.Router, {
          history: store.history
        },
          options.routes
        )
      ),
      mountPoint
    );
    return mountPoint;
  }
  return (module.hot) ? render : render();
};

/**
 * register namespaces see {@link module:lib/store~register}
 * @type {Function|module:lib/store~register}
 * @public
 * @example
 * import { register } from 'hops';
 * export const { select, update } = register('foo');
 */
exports.register = require('./store').register;
