/**
 * @file lib/browser
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 *
 * @module hops/browser
 */

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

var defaults = require('./defaults');

/** @ignore */
function assign(base, addition) {
  for (var key in addition) {
    if (addition.hasOwnProperty(key)) {
      base[key] = addition[key];
    }
  }
  var additions = Array.prototype.slice.call(arguments, 2);
  if (!additions.length) { return base; }
  else { return assign.apply(null, [base].concat(additions)); }
}

/**
 * @description
 * hops' main function - renders your react app to html
 *
 * @param {?object}   overrides - overrides default options
 * @param {?string}   overrides.mountPoint - querySelector of mount point
 * @param {?object}   overrides.routes - react router routes
 * @param {?object}   overrides.initialState - global initial state
 * @param {?object}   overrides.history - browser/memory history
 * @param {?function} overrides.createStore - redux store creator function
 *
 * @return {function} return value is used in hops
 *
 * @example
 * import { render } from 'hops';
 * import { routes } from './routes';
 * export default render({ routes });
 */
exports.render = function(overrides) {
  return function render() {
    var options = assign({}, defaults, overrides);
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
  };
};

/**
 * @function
 *
 * @see {@link module:hops/store.register}
 *
 * @param {!string}   namespace - reducer namespace
 * @param {!function} reducer - redux reducer function
 *
 * @return {function}
 */
exports.register = require('./store').register;
