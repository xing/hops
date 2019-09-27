const { Mixin } = require('hops-mixin');
const deprecate = require('depd')('hops-express');

class ExpressCoreMixin extends Mixin {
  configureServer(app, middleware, mode) {
    deprecate(
      '[DEP0002] hops-express is deprecated. The contained feature is now part of the hops package.'
    );

    if (mode === 'serve' && process.env.NODE_ENV === 'production') {
      middleware.prefiles.push(require('compression')());
    }
  }
}

module.exports = ExpressCoreMixin;
