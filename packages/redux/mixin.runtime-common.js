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

    return middlewares.map(m => applyMiddleware(m));
  }
}

ReduxRuntimeCommonMixin.strategies = {
  getReduxMiddlewares: override,
};

module.exports = ReduxRuntimeCommonMixin;
