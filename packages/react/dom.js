import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import mixinable from 'mixinable';

import hopsConfig from 'hops-config';

import { createCombinedContext } from './lib/common';
export * from './lib/components';

export const combineContexts = mixinable({
  bootstrap: mixinable.async.parallel,
  enhanceElement: mixinable.async.compose,
  getMountpoint: mixinable.override,
});

export class ReactContext {
  constructor(options = {}) {
    this.routerOptions = Object.assign(
      {
        basename: hopsConfig.basePath,
      },
      options.router || {}
    );
    this.mountpoint = options.mountpoint || '#main';
  }

  enhanceElement(reactElement) {
    return React.createElement(BrowserRouter, this.routerOptions, reactElement);
  }

  getMountpoint() {
    return document.querySelector(this.mountpoint);
  }
}

export const contextDefinition = ReactContext;

export const createContext = combineContexts(ReactContext);

const renderWithContext = (reactElement, context) => {
  return () => {
    const mountpoint = context.getMountpoint();
    const isMounted = mountpoint.hasAttribute('data-hopsroot');

    if (isMounted) {
      ReactDOM.unmountComponentAtNode(mountpoint);
    } else {
      mountpoint.setAttribute('data-hopsroot', '');
    }

    context
      .bootstrap()
      .then(() => context.enhanceElement(reactElement))
      .then(enhancedElement => {
        if (ReactDOM.hydrate && !isMounted) {
          ReactDOM.hydrate(enhancedElement, mountpoint);
        } else {
          ReactDOM.render(enhancedElement, mountpoint);
        }
      })
      .catch(error => console.error('Error while rendering:', error));
  };
};

export const render = (reactElement, contextOrConfig) => {
  let context;
  if (mixinable.isMixinable(contextOrConfig)) {
    context = contextOrConfig;
  } else {
    context = createCombinedContext(
      contextOrConfig,
      ReactContext,
      combineContexts
    );
  }
  return renderWithContext(reactElement, context);
};
