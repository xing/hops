import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import { Provider } from './context';

class ImportComponentMixin extends Mixin {
  bootstrap(_req, res) {
    if (res) {
      res.locals.modules = this.modules = [];
    }
  }

  enhanceElement(element) {
    return createElement(Provider, { value: this.modules }, element);
  }
}

export default ImportComponentMixin;
