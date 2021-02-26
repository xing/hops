// eslint-disable-next-line node/no-deprecated-api
import { parse } from 'url';

import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import { StaticRouter } from 'react-router-dom';
import { ensureLeadingSlash, trimTrailingSlash } from 'pathifist';

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

export default ReactRouterMixin;
