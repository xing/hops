const { Mixin } = require('hops-bootstrap');
const { createElement } = require('react');
const { HelmetProvider } = require('react-helmet-async');

class ReactHelmetMixin extends Mixin {
  constructor(config, _element, options) {
    super(config, options);
    this.helmet = {};
  }

  bootstrap(_req, res) {
    if (res) {
      res.locals.helmet = this.helmet;
    }
  }

  enhanceElement(element) {
    return createElement(HelmetProvider, { context: this.helmet }, element);
  }
}

module.exports = ReactHelmetMixin;
