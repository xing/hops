const { Mixin } = require('hops-mixin');
const { createElement } = require('react');
const { BrowserRouter } = require('react-router-dom');
const { ensureLeadingSlash, trimTrailingSlash } = require('pathifist');

class ReactRouterMixin extends Mixin {
  enhanceElement(element) {
    const props = {
      ...this.options.router,
      basename: trimTrailingSlash(ensureLeadingSlash(this.config.basePath)),
    };

    return createElement(BrowserRouter, props, element);
  }
}

module.exports = ReactRouterMixin;
