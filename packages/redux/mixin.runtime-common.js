import { createElement } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import ReduxThunkMiddleware from 'redux-thunk';
import { Mixin, strategies } from 'hops-mixin';

const {
  sync: { override },
} = strategies;

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
    return createElement(
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

export default ReduxRuntimeCommonMixin;
