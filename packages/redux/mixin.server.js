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
  sync: { override, pipe },
} = require('mixinable');

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
        fetch: this.configureFetch(require('isomorphic-fetch')),
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
    return <Provider store={this.getReduxStore()}>{reactElement}</Provider>;
  }
}

ReduxMixin.strategies = {
  getReduxStore: override,
  getReduxMiddlewares: override,
  configureFetch: pipe,
};

module.exports = ReduxMixin;
