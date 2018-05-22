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

const ReduxCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

class ReduxMixin extends Mixin {
  constructor(config, element, options = {}) {
    super(config);

    this.middlewares = options.middlewares || [ReduxThunkMiddleware];
    this.reducers = options.reducers || {};

    if (module.hot) {
      this.store = global.store || (global.store = this.createStore());
      Object.entries(this.reducers).forEach(([key, reducer]) => {
        this.store.replaceReducer(combineReducers(this.reducers));
      });
    } else {
      this.store = this.createStore();
    }
  }

  createStore() {
    return createStore(
      combineReducers(this.reducers),
      global.REDUX_STATE,
      this.composeEnhancers(...this.applyMiddlewares())
    );
  }

  getMiddlewares() {
    return this.middlewares;
  }

  applyMiddlewares() {
    return this.getMiddlewares().map(m => applyMiddleware(m));
  }

  composeEnhancers(...enhancers) {
    return ReduxCompose(...enhancers);
  }

  enhanceElement(reactElement) {
    return <Provider store={this.store}>{reactElement}</Provider>;
  }
}

module.exports = ReduxMixin;
