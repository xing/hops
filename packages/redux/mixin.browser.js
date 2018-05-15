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
const serialize = require('serialize-javascript');

const ReduxCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

class ReduxMixin extends Mixin {
  constructor(config, element, options) {
    super(config, options);
    this.options = options;

    this.middlewares = options.middlewares || [ReduxThunkMiddleware];

    if (module.hot) {
      this.store = global.store || (global.store = this.createStore());
      Object.entries(options.reducers).forEach(([key, reducer]) => {
        this.store.replaceReducer(combineReducers(options.reducers));
      });
    } else {
      this.store = this.createStore();
    }
  }

  createStore() {
    return createStore(
      combineReducers(this.options.reducers),
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
