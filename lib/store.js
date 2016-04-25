
var ReactRouter = require('react-router');
var ReactRouterRedux = require('react-router-redux');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;
var update = require('react-addons-update');

function isFunc(object) {
  return (typeof object === 'function');
}

function getType(key) {
  return 'update' + key.charAt(0).toUpperCase() + key.slice(1);
}

function devTools () {
  if ('devToolsExtension' in global) {
    return global.devToolsExtension();
  } else {
    return function (f) { return f; };
  }
}

exports.createAction = function (key) {
  var type = getType(key);
  return function (payload) {
    return { type: type, payload: payload };
  };
};

exports.createReducer = function (key) {
  var type = getType(key);
  return function (state, action) {
    if (action && action.type === type) {
      return update(state, action.payload);
    }
    return state || {};
  };
};

exports.createStore = function (reducer, initialState, enhancer, history) {
  history = history || ReactRouter.browserHistory;
  initialState = initialState || global.INITIAL_STATE || {};
  reducer = isFunc(reducer) ? reducer : Redux.combineReducers(
    Object.assign({}, reducer, { routing: ReactRouterRedux.routerReducer })
  );
  enhancer = isFunc(enhancer) ? enhancer : Redux.compose(
    Redux.applyMiddleware(
      ReduxThunkMiddleware,
      ReactRouterRedux.routerMiddleware(history)
    ),
    devTools()
  );
  var store = Redux.createStore(reducer, initialState, enhancer);
  return Object.assign(store, {
    history: ReactRouterRedux.syncHistoryWithStore(history, store)
  });
};
