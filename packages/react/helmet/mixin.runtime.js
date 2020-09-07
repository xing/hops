const { Mixin } = require('hops-mixin');
const { createElement } = require('react');
const { HelmetProvider } = require('react-helmet-async');

class ReactHelmetMixin extends Mixin {
  constructor(config, _element, options) {
    super(config, options);
    this.context = {};
  }

  bootstrap(_req, res) {
    if (res) {
      res.locals.helmetContext = this.context;
    }
  }

  enhanceElement(element) {
    return createElement(HelmetProvider, { context: this.context }, element);
  }
}

module.exports = ReactHelmetMixin;
