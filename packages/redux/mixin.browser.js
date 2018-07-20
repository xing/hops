const React = require('react');
const {
  compose,
  combineReducers,
  createStore,
  applyMiddleware,
} = require('redux');
const ReduxThunkMiddleware = require('redux-thunk').default;
const { Provider } = require('react-redux');
const { Mixin } = require('@untool/core');

const {
  sync: { override, pipe },
} = require('mixinable');

const ReduxCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

class ReduxMixin extends Mixin {
  constructor(config, element, { redux: options = {} } = {}) {
    super(config);
    this.middlewares = options.middlewares;
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

  configureFetch() {
    return require('isomorphic-fetch');
  }

  getReduxMiddlewares() {
    return [
      ReduxThunkMiddleware.withExtraArgument({
        fetch: this.configureFetch(),
      }),
    ];
  }

  applyMiddlewares() {
    const middlewares = this.middlewares || this.getReduxMiddlewares();

    return middlewares.map(m => applyMiddleware(m));
  }

  composeEnhancers(...enhancers) {
    return ReduxCompose(...enhancers);
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
