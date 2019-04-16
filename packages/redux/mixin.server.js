const { createStore, combineReducers, compose } = require('redux');
const ReduxRuntimeCommonMixin = require('./mixin.runtime-common');

class ReduxMixin extends ReduxRuntimeCommonMixin {
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
}

module.exports = ReduxMixin;
