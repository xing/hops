import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import ImportComponentContext from './context';

export default class ImportComponentMixin extends Mixin {
  bootstrap(_req, res) {
    if (res) {
      res.locals.modules = this.modules = [];
    }
  }

  enhanceElement(element) {
    return createElement(
      ImportComponentContext.Provider,
      { value: this.modules },
      element
    );
  }
}
