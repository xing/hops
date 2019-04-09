const React = require('react');
const { compose, combineReducers, createStore } = require('redux');
const { Provider } = require('react-redux');
const {
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');
const ReduxRuntimeCommonMixin = require('./mixin.runtime-common');

const ReduxCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

class ReduxMixin extends ReduxRuntimeCommonMixin {
  constructor(config, element, { redux: options = {} } = {}) {
    super(config);
    this.reducers = options.reducers || {};
  }

  createStore() {
    return createStore(
      combineReducers(this.reducers),
      global.REDUX_STATE,
      this.composeEnhancers(...this.applyMiddlewares())
    );
  }

  getReduxStore() {
    if (this.store) {
      return this.store;
    }

    if (module.hot) {
      this.store = global.store || (global.store = this.createStore());
      this.store.replaceReducer(combineReducers(this.reducers));
    } else {
      this.store = this.createStore();
    }

    return this.store;
  }

  composeEnhancers(...enhancers) {
    return ReduxCompose(...enhancers);
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
