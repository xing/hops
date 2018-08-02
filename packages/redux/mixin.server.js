const React = require('react');
const {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} = require('redux');

const ReduxThunkMiddleware = require('redux-thunk').default;
const { Provider } = require('react-redux');
const {
  Mixin,
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');

class ReduxMixin extends Mixin {
  constructor(config, element, { redux: options = {} } = {}) {
    super(config);
    this.middlewares = options.middlewares;
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

  getReduxMiddlewares() {
    return [
      ReduxThunkMiddleware.withExtraArgument({
        config: this.config,
      }),
    ];
  }

  applyMiddlewares() {
    const middlewares = this.middlewares || this.getReduxMiddlewares();

    return middlewares.map(m => applyMiddleware(m));
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
  getReduxMiddlewares: override,
};

module.exports = ReduxMixin;
