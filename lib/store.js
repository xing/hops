
var ReactRouter = require('react-router');
var ReactRouterRedux = require('react-router-redux');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

function getDevTools () {
  if ('devToolsExtension' in global) {
    return global.devToolsExtension();
  } else {
    return function (f) { return f; };
  }
}

function getReducer(options) {
  if (typeof options.reducer === 'function') {
    return options.reducer;
  }
  else {
    return Redux.combineReducers(
      Object.assign(
        {},
        options.reducer,
        { routing: ReactRouterRedux.routerReducer }
      )
    );
  }
}

function getEnhancer(options) {
  if (typeof options.enhancer === 'function') {
    return options.enhancer;
  }
  else {
    return Redux.compose(
      Redux.applyMiddleware(
        ReduxThunkMiddleware,
        ReactRouterRedux.routerMiddleware(options.history)
      ),
      getDevTools()
    );
  }
}

function getInitialState(options) {
  return options.initialState || {};
}

exports.createStore = function (options) {
  options.history = options.history || ReactRouter.browserHistory;
  var store = Redux.createStore(
    getReducer(options),
    getInitialState(options),
    getEnhancer(options)
  );
  return Object.assign(store, {
    history: ReactRouterRedux.syncHistoryWithStore(options.history, store)
  });
};
