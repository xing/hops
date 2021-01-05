/* eslint-env browser, node */

import { createElement } from 'react';
import { Mixin, strategies } from 'hops-mixin';
import context from './context';

const {
  sync: { pipe, callable },
} = strategies;

export default class HopsReactServerDataServerMixin extends Mixin {
  bootstrap(req, res) {
    if (req) {
      this.serverData = this.enhanceServerData({}, req, res);
    }
  }

  getServerData() {
    return this.serverData;
  }

  getTemplateData(data) {
    if (this.serverData) {
      data.globals = {
        ...data.globals,
        _hopsServerData: this.getServerData(),
      };
    }

    return data;
  }

  enhanceElement(reactElement) {
    return createElement(
      context.Provider,
      { value: this.getServerData() },
      reactElement
    );
  }
}

HopsReactServerDataServerMixin.strategies = {
  enhanceServerData: pipe,
  getServerData: callable,
};
