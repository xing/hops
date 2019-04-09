const React = require('react');
const { createStore, combineReducers, compose } = require('redux');
const { Provider } = require('react-redux');
const {
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');
const ReduxRuntimeCommonMixin = require('./mixin.runtime-common');

class ReduxMixin extends ReduxRuntimeCommonMixin {
  constructor(config, element, { redux: options = {} } = {}) {
    super(config);
    this.reducers = options.reducers || {};
  }

  createStore() {
    return createStore(
      combineReducers(this.reducers),
      undefined,
      this.composeEnhancers(...this.applyMiddlewares())
    );
  }

  getReduxStore() {
    if (this.store) {
      return this.store;
    }

    this.store = this.createStore();
    return this.store;
  }

  composeEnhancers(...enhancers) {
    return compose(...enhancers);
  }

  getTemplateData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        REDUX_STATE: this.getReduxStore().getState(),
      },
    };
  }

  enhanceElement(reactElement) {
    return React.createElement(
      Provider,
      { store: this.getReduxStore() },
      reactElement
    );
  }
}

ReduxMixin.strategies = {
  getReduxStore: override,
};

module.exports = ReduxMixin;
