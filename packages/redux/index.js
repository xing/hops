'use strict';

var React = require('react');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

var Context = require('hops-react').Context;

var REDUX_STATE = 'REDUX_STATE';

exports.Context = exports.createContext = Context.mixin({
  initialize: function (options) {
    this.reducers = {};
    Object.keys(options.reducers || {}).forEach(
      function (key) {
        this.registerReducer(key, options.reducers[key]);
      }.bind(this)
    );
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
      global[REDUX_STATE],
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
  enhanceElement: function (reactElement) {
    return React.createElement(
      ReactRedux.Provider,
      {
        store: this.getStore()
      },
      reactElement
    );
  },
  getTemplateData: function (templateData) {
    return Object.assign(templateData, {
      globals: templateData.globals.concat([{
        name: REDUX_STATE,
        value: this.getStore().getState()
      }])
    });
  }
});
