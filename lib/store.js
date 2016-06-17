/**
 * @file lib/store
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 * @author Ricard Sole-Casas <ricardsolecasas@gmail.com>
 *
 * @module hops/store
 */

var ReactRouterRedux = require('react-router-redux');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

/** @ignore */
function createStore(reducers, options) {
  var store = Redux.createStore(
    Redux.combineReducers(reducers),
    options.initialState,
    Redux.compose(
      Redux.applyMiddleware(
        ReduxThunkMiddleware,
        ReactRouterRedux.routerMiddleware(options.history)
      ),
      global.devToolsExtension ? global.devToolsExtension() : function(f) {
        return f;
      }
    )
  );
  return Object.assign(store, {
    history: ReactRouterRedux.syncHistoryWithStore(
      options.history,
      store
    )
  });
}

/** @ignore */
function createContext(reducers) {
  reducers = reducers || {
    routing: ReactRouterRedux.routerReducer
  };
  var store;
  return {
    /**
     * @description register namespaced reducer
     *
     * @static
     *
     * @param {!string}   namespace - reducer namespace
     * @param {!function} reducer - redux reducer function
     *
     * @return {function}
     *
     * @example
     * import { register } from 'hops';
     * const select = register('foo', (state, action) => state);
     */
    register: function(namespace, reducer) {
      reducers[namespace] = reducer;
      if (store) {
        store.replaceReducer(Redux.combineReducers(reducers));
      }
      return function(state) {
        return state[namespace];
      };
    },

    /**
     * @description create redux store
     *
     * @static
     * @private
     *
     * @param {!Object} options
     * @param {!Object} options.initialState
     * @param {!Object} options.history
     * @return {Object}
     */
    createStore: function(options) {
      return store || (store = createStore(reducers, options));
    },

    /**
     * @description create store context
     *
     * @static
     * @private
     *
     * @function
     * @param {?function[]} reducers
     * @return {Object}
     */
    createContext: createContext
  };
}

/** @ignore */
module.exports = createContext();
