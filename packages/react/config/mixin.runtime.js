/* eslint-env browser, node */

const React = require('react');
const { Mixin } = require('hops-mixin');

const { Provider } = require('./context');

const warnOnIncompleteBrowserWhitelist = config => {
  if (process.env.NODE_ENV === 'development' && typeof Proxy === 'function') {
    return new Proxy(config, {
      get: (obj, prop) => {
        const value = obj[prop];

        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
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
    return React.createElement(
      Provider,
      { value: warnOnIncompleteBrowserWhitelist(this.config) },
      reactElement
    );
  }
}

module.exports = HopsReactConfigMixin;
