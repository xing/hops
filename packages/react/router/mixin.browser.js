import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ensureLeadingSlash, trimTrailingSlash } from 'pathifist';

export default class ReactRouterMixin extends Mixin {
  enhanceElement(element) {
    const props = {
      ...this.options.router,
      basename: trimTrailingSlash(ensureLeadingSlash(this.config.basePath)),
    };

    return createElement(BrowserRouter, props, element);
  }
}
