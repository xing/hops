import { compose, combineReducers, createStore } from 'redux';
import ReduxRuntimeCommonMixin from './mixin.runtime-common';

const ReduxCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

class ReduxMixin extends ReduxRuntimeCommonMixin {
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

  composeEnhancers(...enhancers) {
    return ReduxCompose(...enhancers);
  }
}

export default ReduxMixin;
