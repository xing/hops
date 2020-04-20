/* eslint-env browser, node */

const React = require('react');
const {
  Mixin,
  strategies: {
    sync: { callable },
  },
} = require('hops-mixin');

const { Provider } = require('./context');

class HopsReactServerDataBrowserMixin extends Mixin {
  getServerData() {
    return window._hopsServerData || {};
  }

  enhanceElement(reactElement) {
    return React.createElement(
      Provider,
      { value: this.getServerData() },
      reactElement
    );
  }
}

HopsReactServerDataBrowserMixin.strategies = {
  getServerData: callable,
};

module.exports = HopsReactServerDataBrowserMixin;
