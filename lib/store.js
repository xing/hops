
var ReactRouter = require('react-router');
var ReactRouterRedux = require('react-router-redux');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;
var update = require('react-addons-update');

function isFunc(object) {
  return (typeof object === 'function');
}

module.exports = {
  createReducer: function (key) {
    var type = 'update' + key.charAt(0).toUpperCase() + key.slice(1);
    var reducer = function (state, action) {
      if (action && action.type === type) {
        return update(state, action.payload);
      }
      return state || {};
    };
    return Object.assign(reducer, {
      createAction: function (payload) {
        return { type: type, payload: payload };
      },
      createSelector: function () {
        return function (state) { return state[key]; };
      },
      registerReducer: function (reducers) {
        reducers = reducers || {};
        if (key in reducers) {
          throw new Error('reducer namespace clash: ' + key);
        }
        reducers[key] = reducer;
        return reducers;
      }
    });
  },
  createStore: function (reducer, initialState, enhancer, history) {
    history = history || ReactRouter.browserHistory;
    initialState = initialState || global.INITIAL_STATE || {};
    reducer = isFunc(reducer) ? reducer : Redux.combineReducers(
      Object.assign({}, reducer, { routing: ReactRouterRedux.routerReducer })
    );
    enhancer = isFunc(enhancer) ? enhancer : Redux.applyMiddleware(
      ReduxThunkMiddleware,
      ReactRouterRedux.routerMiddleware(history)
    );
    var store = Redux.createStore(reducer, initialState, enhancer);
    return Object.assign(store, {
      history: ReactRouterRedux.syncHistoryWithStore(history, store)
    });
  }
};
