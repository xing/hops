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
    Object.keys(options.reducers).forEach(function (key) {
      this.registerReducer(key, options.reducers[key]);
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
      this.createEnhancer()
    );
  },
  createEnhancer: function () {
    return this.composeMiddlewares();
  },
  composeEnhancers: function () {
    var compose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    return compose.apply(null, arguments);
  },
  composeMiddlewares: function () {
    return this.composeEnhancers.apply(this, this.applyMiddlewares());
  },
  applyMiddlewares: function () {
    return this.getMiddlewares().map(function (middleware) {
      return Redux.applyMiddleware(middleware);
    });
  },
  getMiddlewares: function () {
    return [ReduxThunkMiddleware];
  },
  createProvider: function (reactElement) {
    return React.createElement(
      ReactRedux.Provider,
      { store: this.getStore() },
      reactElement
    );
  },
  enhanceElement: function (reactElement) {
    return Context.prototype.enhanceElement.call(
      this,
      this.createProvider(reactElement)
    );
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
