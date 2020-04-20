/* eslint-env browser, node */

const React = require('react');
const {
  Mixin,
  strategies: {
    sync: { pipe, callable },
  },
} = require('hops-mixin');
const { Provider } = require('./context');

class HopsReactServerDataServerMixin extends Mixin {
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
    return React.createElement(
      Provider,
      { value: this.getServerData() },
      reactElement
    );
  }
}

HopsReactServerDataServerMixin.strategies = {
  enhanceServerData: pipe,
  getServerData: callable,
};

module.exports = HopsReactServerDataServerMixin;
