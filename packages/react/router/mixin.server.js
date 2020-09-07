// eslint-disable-next-line node/no-deprecated-api
const { parse } = require('url');
const { Mixin } = require('hops-mixin');
const { createElement } = require('react');
const { StaticRouter } = require('react-router-dom');
const { ensureLeadingSlash, trimTrailingSlash } = require('pathifist');

class ReactRouterMixin extends Mixin {
  constructor(config, _element, options) {
    super(config, options);
    this.router = {};
  }

  bootstrap(req, res) {
    this.url = parse(req.url);
    res.locals.router = this.router;
  }

  enhanceElement(element) {
    const { pathname, search } = this.url;
    const props = {
      ...this.options.router,
      location: { pathname, search },
      basename: trimTrailingSlash(ensureLeadingSlash(this.config.basePath)),
      context: this.router,
    };

    return createElement(StaticRouter, props, element);
  }
}

module.exports = ReactRouterMixin;
