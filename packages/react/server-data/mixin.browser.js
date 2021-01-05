/* eslint-env browser, node */
import { createElement } from 'react';

import { Mixin, strategies } from 'hops-mixin';

import context from './context';

const {
  sync: { callable },
} = strategies;

export default class HopsReactServerDataBrowserMixin extends Mixin {
  getServerData() {
    return window._hopsServerData || {};
  }

  enhanceElement(reactElement) {
    return createElement(
      context.Provider,
      { value: this.getServerData() },
      reactElement
    );
  }
}

HopsReactServerDataBrowserMixin.strategies = {
  getServerData: callable,
};
