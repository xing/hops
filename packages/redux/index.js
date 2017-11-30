'use strict';

var React = require('react');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

var hopsReact = require('hops-react');

var REDUX_STATE = 'REDUX_STATE';

exports.ReduxContext = function(options) {
  this.reducers = {};
  options = options || {};
  this.middlewares = options.middlewares || [ReduxThunkMiddleware];
  if (!Array.isArray(this.middlewares)) {
    throw new Error('middlewares needs to be an array');
  }
  Object.keys(options.reducers || {}).forEach(
    function(key) {
      this.registerReducer(key, options.reducers[key]);
    }.bind(this)
  );
};
exports.ReduxContext.prototype = {
  registerReducer: function(namespace, reducer) {
    this.reducers[namespace] = reducer;
    if (this.store) {
      this.store.replaceReducer(Redux.combineReducers(this.reducers));
    }
  },
  getStore: function() {
    if (module.hot) {
      this.store = global.store || (global.store = this.createStore());
    }
    return this.store || (this.store = this.createStore());
  },
  createStore: function() {
    return Redux.createStore(
      Redux.combineReducers(this.reducers),
      global[REDUX_STATE],
      this.createEnhancer()
    );
  },
  createEnhancer: function() {
    return this.composeMiddlewares();
  },
  composeEnhancers: function() {
    var compose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    return compose.apply(null, arguments);
  },
  composeMiddlewares: function() {
    return this.composeEnhancers.apply(this, this.applyMiddlewares());
  },
  applyMiddlewares: function() {
    return this.getMiddlewares().map(function(middleware) {
      return Redux.applyMiddleware(middleware);
    });
  },
  getMiddlewares: function() {
    return this.middlewares;
  },
  enhanceElement: function(reactElement) {
    return React.createElement(
      ReactRedux.Provider,
      {
        store: this.getStore(),
      },
      reactElement
    );
  },
  getTemplateData: function(templateData) {
    return Object.assign({}, templateData, {
      globals: (templateData.globals || []).concat([
        {
          name: REDUX_STATE,
          value: this.getStore().getState(),
        },
      ]),
    });
  },
};

exports.contextDefinition = exports.ReduxContext;

exports.createContext = hopsReact.combineContexts(
  hopsReact.ReactContext,
  exports.ReduxContext
);
