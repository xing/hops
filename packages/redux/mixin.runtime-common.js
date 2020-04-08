const React = require('react');
const { Provider } = require('react-redux');
const { applyMiddleware } = require('redux');
const ReduxThunkMiddleware = require('redux-thunk').default;
const {
  Mixin,
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');

class ReduxRuntimeCommonMixin extends Mixin {
  constructor(config, element, { redux: options = {} } = {}) {
    super(config);
    this.middlewares = options.middlewares || [];
    this.reducers = options.reducers || {};
  }

  getReduxMiddlewares() {
    return [
      ...this.middlewares,
      ReduxThunkMiddleware.withExtraArgument({
        config: this.config,
      }),
    ];
  }

  applyMiddlewares() {
    const middlewares = this.getReduxMiddlewares();

    return middlewares.map((m) => applyMiddleware(m));
  }

  enhanceElement(reactElement) {
    return React.createElement(
      Provider,
      { store: this.getReduxStore() },
      reactElement
    );
  }
}

ReduxRuntimeCommonMixin.strategies = {
  getReduxMiddlewares: override,
  getReduxStore: override,
};

module.exports = ReduxRuntimeCommonMixin;
