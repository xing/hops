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
    this.reducers = options.reducers || (options.reducers = {});
    Object.keys(this.reducers).forEach(function (key) {
      this.registerReducer(key, this.reducers[key]);
    }.bind(this));
  },
  registerReducer: function (namespace, reducer) {
    this.reducers[namespace] = reducer;
    if (this.store) {
      this.store.replaceReducer(Redux.combineReducers(this.reducers));
    }
  },
  getStore: function () {
    if (module.hot) {
      this.store = global.store || (global.store = this.createStore());
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
    var templateData = Context.prototype.getTemplateData.call(this);
    return Object.assign(templateData, {
      globals: templateData.globals.concat([{
        name: INITIAL_STATE,
        value: this.getStore().getState()
      }])
    });
  }
});
