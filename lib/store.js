
var ReactRouterRedux = require('react-router-redux');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

function createStore(reducers, options) {
  var store = Redux.createStore(
    Redux.combineReducers(reducers),
    options.initialState,
    Redux.compose(
      Redux.applyMiddleware(
        ReduxThunkMiddleware,
        ReactRouterRedux.routerMiddleware(options.history)
      ),
      global.devToolsExtension ? global.devToolsExtension() : function (f) {
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

function createContext(reducers) {
  reducers = reducers || {
    routing: ReactRouterRedux.routerReducer
  };
  var store;
  return {
    register: function (namespace, reducer) {
      reducers[namespace] = reducer;
      if (store) {
        store.replaceReducer(Redux.combineReducers(reducers));
      }
      return function (state) { return state[namespace]; };
    },
    createStore: function (options) {
      return store || (store = createStore(reducers, options));
    },
    createContext: createContext
  };
}

module.exports = createContext();
