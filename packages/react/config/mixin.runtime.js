/* eslint-env browser, node */

const React = require('react');
const { Mixin } = require('hops-mixin');

const { Provider } = require('./context');

class HopsReactConfigMixin extends Mixin {
  enhanceElement(reactElement) {
    return React.createElement(Provider, { value: this.config }, reactElement);
  }
}

module.exports = HopsReactConfigMixin;
