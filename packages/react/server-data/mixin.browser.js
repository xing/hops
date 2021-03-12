/* eslint-env browser, node */

import { createElement } from 'react';

import { Mixin, strategies } from 'hops-mixin';
import { Provider } from './context';

const {
  sync: { callable },
} = strategies;

class HopsReactServerDataBrowserMixin extends Mixin {
  getServerData() {
    return window._hopsServerData || {};
  }

  enhanceElement(reactElement) {
    return createElement(
      Provider,
      { value: this.getServerData() },
      reactElement
    );
  }
}

HopsReactServerDataBrowserMixin.strategies = {
  getServerData: callable,
};

export default HopsReactServerDataBrowserMixin;
