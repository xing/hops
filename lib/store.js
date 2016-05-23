
var ReactRouter = require('react-router');
var ReactRouterRedux = require('react-router-redux');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;
var update = require('react-addons-update');

function getType(namespace) {
  return 'update' + namespace.replace(
    /(?:^|[\W_]+)(\w)/g,
    function (match, p1) {
      return p1.toUpperCase();
    }
  );
}

function getDevTools() {
  if ('devToolsExtension' in global) {
    return global.devToolsExtension();
  } else {
    return function (f) { return f; };
  }
}

function createReducer(namespace) {
  var type = getType(namespace);
  return function (state, action) {
    if (action && action.type === type) {
      return update(state, action.payload);
    }
    return Object.assign({}, state);
  };
}

function createActionCreator(namespace) {
  var type = getType(namespace);
  return function (payload) {
    return { type: type, payload: payload };
  };
}

function createSelector(namespace) {
  return function (state) {
    return state[namespace];
  };
}

function createStore(reducers, options) {
  var history = options.history || ReactRouter.browserHistory;
  var store = Redux.createStore(
    Redux.combineReducers(reducers),
    options.initialState,
    Redux.compose(
      Redux.applyMiddleware(
        ReduxThunkMiddleware,
        ReactRouterRedux.routerMiddleware(history)
      ),
      getDevTools()
    )
  );
  return Object.assign(store, {
    history: ReactRouterRedux.syncHistoryWithStore(history, store)
  });
}

function createContext(reducers) {
  reducers = reducers || {
    routing: ReactRouterRedux.routerReducer
  };
  return {
    register: function (namespace, reducer) {
      if (namespace in reducers) {
        throw new Error('namespace collision: ' + namespace);
      }
      reducers[namespace] = reducer || createReducer(namespace);
      return {
        update: reducer ? null : createActionCreator(namespace),
        select: createSelector(namespace)
      };
    },
    getReducers: function () {
      return Object.assign({}, reducers);
    },
    createStore: createStore.bind(null, reducers),
    createContext: createContext
  };
}

module.exports = createContext();
