/* eslint-env browser, node */

import { createElement } from 'react';

import { Mixin } from 'hops-mixin';
import { Provider } from './context';

const warnOnIncompleteBrowserWhitelist = (config) => {
  if (process.env.NODE_ENV === 'development' && typeof Proxy === 'function') {
    return new Proxy(config, {
      get: (obj, prop) => {
        const value = obj[prop];
        const isPropTypesSymbolCheck = prop === '@@toStringTag';

        if (
          !Object.prototype.hasOwnProperty.call(obj, prop) &&
          !isPropTypesSymbolCheck
        ) {
          console.warn(
            `The property "${prop}" does not exist. Did you forget to add it to the browserWhitelist of your Hops config?`
          );
        }

        return value;
      },
    });
  }

  return config;
};

class HopsReactConfigMixin extends Mixin {
  enhanceElement(reactElement) {
    return createElement(
      Provider,
      { value: warnOnIncompleteBrowserWhitelist(this.config) },
      reactElement
    );
  }
}

export default HopsReactConfigMixin;
