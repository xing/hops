import React from 'react';
import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware,
} from 'redux/es';
import { Provider } from 'react-redux/es';
import ReduxThunkMiddleware from 'redux-thunk';

import hopsReact from 'hops-react';

const REDUX_STATE = 'REDUX_STATE';

export class ReduxContext {
  constructor(_options = {}) {
    const options = _options.redux || _options;
    this.reducers = {};
    this.middlewares = options.middlewares || [ReduxThunkMiddleware];
    if (!Array.isArray(this.middlewares)) {
      throw new Error('middlewares needs to be an array');
    }
    Object.keys(options.reducers || {}).forEach(key => {
      this.registerReducer(key, options.reducers[key]);
    });
  }

  registerReducer(namespace, reducer) {
    this.reducers[namespace] = reducer;
    if (this.store) {
      this.store.replaceReducer(combineReducers(this.reducers));
    }
  }

  getStore() {
    if (module.hot) {
      this.store = global.store || (global.store = this.createStore());
    }
    return this.store || (this.store = this.createStore());
  }

  createStore() {
    return createStore(
      combineReducers(this.reducers),
      global[REDUX_STATE],
      this.createEnhancer()
    );
  }

  createEnhancer() {
    return this.composeMiddlewares();
  }

  composeEnhancers(...args) {
    return (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(...args);
  }

  composeMiddlewares() {
    return this.composeEnhancers(...this.applyMiddlewares());
  }

  applyMiddlewares() {
    return this.getMiddlewares().map(middleware => applyMiddleware(middleware));
  }

  getMiddlewares() {
    return this.middlewares;
  }

  enhanceElement(reactElement) {
    return React.createElement(
      Provider,
      {
        store: this.getStore(),
      },
      reactElement
    );
  }

  getTemplateData(templateData) {
    return Object.assign({}, templateData, {
      globals: (templateData.globals || []).concat([
        {
          name: REDUX_STATE,
          value: this.getStore().getState(),
        },
      ]),
    });
  }
}

export const contextDefinition = ReduxContext;

export const createContext = hopsReact.combineContexts(
  hopsReact.ReactContext,
  ReduxContext
);

export const reduxExtension = config => {
  return {
    context: ReduxContext,
    config: {
      redux: config,
    },
  };
};
