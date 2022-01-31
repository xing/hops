import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import { Provider } from './context';

class ImportComponentMixin extends Mixin {
  bootstrap(_req, res) {
    if (res) {
      res.locals.chunks = this.chunks = [];
    }
  }

  enhanceElement(element) {
    return createElement(Provider, { value: this.chunks }, element);
  }
}

export default ImportComponentMixin;
