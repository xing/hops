import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';

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

export default ReactHelmetMixin;
