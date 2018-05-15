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
const serialize = require('serialize-javascript');

class ReduxMixin extends Mixin {
  constructor(config, element, options) {
    super(config, options);
    this.options = options;

    this.middlewares = options.middlewares || [ReduxThunkMiddleware];
    this.store = this.createStore();
  }

  createStore() {
    return createStore(
      combineReducers(this.options.reducers),
      undefined,
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
    return compose(...enhancers);
  }

  enhanceElement(reactElement) {
    return (
      <React.Fragment>
        <Provider store={this.store}>{reactElement}</Provider>
        <script
          dangerouslySetInnerHTML={{
            __html: `REDUX_STATE=${serialize(this.store.getState())};`,
          }}
        />
      </React.Fragment>
    );
  }
}

module.exports = ReduxMixin;
