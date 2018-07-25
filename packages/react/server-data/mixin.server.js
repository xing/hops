/* eslint-env browser, node */

const React = require('react');
const {
  sync: { pipe, override },
} = require('mixinable');
const { Mixin } = require('@untool/core');
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
    return <Provider value={this.getServerData()}>{reactElement}</Provider>;
  }
}

HopsReactServerDataServerMixin.strategies = {
  enhanceServerData: pipe,
  getServerData: override,
};

module.exports = HopsReactServerDataServerMixin;
