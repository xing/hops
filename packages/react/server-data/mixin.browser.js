/* eslint-env browser, node */

const React = require('react');
const {
  sync: { override },
} = require('mixinable');
const { Mixin } = require('@untool/core');
const { Provider } = require('./context');

class HopsReactServerDataBrowserMixin extends Mixin {
  getServerData() {
    return window._hopsServerData || {};
  }

  enhanceElement(reactElement) {
    return <Provider value={this.getServerData()}>{reactElement}</Provider>;
  }
}

HopsReactServerDataBrowserMixin.strategies = {
  getServerData: override,
};

module.exports = HopsReactServerDataBrowserMixin;
