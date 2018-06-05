const React = require('react');
const {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} = require('redux');

const ReduxThunkMiddleware = require('redux-thunk').default;
const { Provider } = require('react-redux');
const { Mixin } = require('@untool/core');

const {
  sync: { override },
} = require('mixinable');

class ReduxMixin extends Mixin {
  constructor(config, element, options = {}) {
    super(config);

    this.middlewares = options.middlewares || [ReduxThunkMiddleware];
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

  getMiddlewares() {
    return this.middlewares;
  }

  applyMiddlewares() {
    return this.getMiddlewares().map(m => applyMiddleware(m));
  }

  composeEnhancers(...enhancers) {
    return compose(...enhancers);
  }

  fetchData(data = {}) {
    return {
      ...data,
      globals: [
        ...(data.globals || []),
        {
          name: 'REDUX_STATE',
          value: this.getReduxStore().getState(),
        },
      ],
    };
  }

  enhanceElement(reactElement) {
    return <Provider store={this.getReduxStore()}>{reactElement}</Provider>;
  }
}

ReduxMixin.strategies = {
  getReduxStore: override,
};

module.exports = ReduxMixin;
