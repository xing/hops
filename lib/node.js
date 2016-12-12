/**
 * @file lib/node
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 * @author Matthias Reis <mr@smartr.de>
 * @author Ricard Sole-Casas <ricardsolecasas@gmail.com>
 *
 * @module hops/node
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

var defaults = require('./defaults');

/** @ignore */
function match(options) {
  return new Promise(function(resolve, reject) {
    ReactRouter.match(
      {
        routes: options.routes,
        history: options.history,
        location: options.location
      },
      function(error, redirect, renderProps) {
        if (renderProps) {
          resolve(Object.assign(options, { renderProps: renderProps }));
        }
        else {
          reject(error, redirect);
        }
      }
    );
  });
}

/** @ignore */
function fetch(options) {
  var store = options.createStore(options);
  var dispatch = store.dispatch.bind(store);
  var components = options.renderProps.components;
  return Promise.all(components.map(function (component) {
    return component.fetchData ? component.fetchData(dispatch) : true;
  }))
  .then(function () {
    return Object.assign(options, { store: store });
  });
}

/** @ignore */
function render(options) {
  try {
    return {
      state: JSON.stringify(Object.assign(
        options.store.getState(),
        { routing: {}}
      )),
      dom: ReactDOM.renderToString(
        React.createElement(ReactRedux.Provider, { store: options.store },
          React.createElement(ReactRouter.RouterContext, options.renderProps)
        )
      )
    };
  } catch (error) {
    console.log('[HOPS PLUGIN ERROR] - rendering ' + options.location + ' failed:', error);
  }
}

/**
 * @description
 * hops' main function - renders your react app to html
 *
 * @param {?object}   overrides - overrides default options
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
exports.render = function (overrides) {
  return function (location, tweaks) {
    var options = Object.assign({}, defaults, overrides, {
      history: ReactRouter.createMemoryHistory(location),
      location: location
    }, tweaks);
    return match(options).then(fetch).then(render);
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
