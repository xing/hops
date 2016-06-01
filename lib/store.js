/**
 * @module lib/store
 * @exports createContext
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 */


var ReactRouterRedux = require('react-router-redux');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

/**
 * create a global store
 * @param  {Array} reducers - list of reducers
 * @param  {Object} options  custom options
 * @return {Object}          history merged with store
 */
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

/**
 * create a context for a reducer
 * @type {Function}
 * @name createContext
 * @namespace createContext
 * @param  {Function} reducers - the reducer function
 * @return {Object}          returns the methods
 */
function createContext(reducers) {
  reducers = reducers || {
    routing: ReactRouterRedux.routerReducer
  };
  var store;
  return {
    /**
     * `register()` is a helper to streamline store/state interactions in hops
     * based projects. If passed only a `namespace` string, a generic reducer
     * using React's [immutability helpers](https://facebook.github.io/react/docs/update.html)
     * is created for that namespace. It's return value is an object containing
     * a selector function for use in ReactRedux' `connect()` and a generic action
     * creator (`update()`) working with the update reducer.
     * @typedef {Function} module:lib/store~register
     * @param  {String} namespace - namespace for the reducer
     * @param  {Function} reducer - the reducer function to register in hops
     * @return {Function}           returns a function to return the state of the current namespace
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
     * return the current store otherwise return a new one
     * @memberof {module:lib/store~createStore}
     * @param  {Object} [options] - options for store registration
     *                            this param is only needed for creating a new store
     * @return {Object}         returns the global store
     */
    createStore: function(options) {
      return store || (store = createStore(reducers, options));
    },
    /**
     * mainly a debugging feature that could be 
     * used advanced operations {@link module:lib/store~createContext}
     * @memberof {module:lib/store~createContext}
     * @type {module:lib/store~createContext}
     * 
    */
    createContext: createContext
  };
}

module.exports = createContext();
