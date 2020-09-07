const { Mixin } = require('hops-mixin');
const { createElement } = require('react');
const ImportComponentContext = require('./context');

class ImportComponentMixin extends Mixin {
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

module.exports = ImportComponentMixin;
