'use strict';

var React = require('react');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

var Context = require('hops-react').Context;

var INITIAL_STATE = 'INITIAL_STATE';

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    Context.prototype.initialize.call(this, options);
    this.reducers = {};
    if (options.reducers) {
      Object.keys(options.reducers || {}).forEach(function (key) {
        this.registerReducer(key, options.reducers[key]);
      }.bind(this));
    }
  },
  bootstrap: function () {
    return Promise.resolve();
  },
  registerReducer: function (namespace, reducer) {
    this.reducers[namespace] = reducer;
    if (this.store) {
      this.store.replaceReducer(Redux.combineReducers(this.reducers));
    }
  },
  getStore: function () {
    if (module.hot) {
      return global.store || (global.store = (this.store = this.createStore()));
    }
    return this.store || (this.store = this.createStore());
  },
  createStore: function () {
    return Redux.createStore(
      Redux.combineReducers(this.reducers),
      global[INITIAL_STATE],
      (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose)(
        Redux.applyMiddleware(ReduxThunkMiddleware)
      )
    );
  },
  enhanceElement: function (reactElement) {
    return Context.prototype.enhanceElement.call(this, React.createElement(
      ReactRedux.Provider,
      { store: this.getStore() },
      reactElement
    ));
  },
  getTemplateData: function () {
    return Object.assign(
      Context.prototype.getTemplateData.call(this),
      {
        globals: [{
          name: INITIAL_STATE,
          value: this.getStore().getState()
        }]
      }
    );
  }
});
