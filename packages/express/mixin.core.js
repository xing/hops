const { Mixin } = require('hops-mixin');

class ExpressCoreMixin extends Mixin {
  configureServer(app, middleware, mode) {
    if (mode === 'serve' && process.env.NODE_ENV === 'production') {
      middleware.prefiles.push(require('compression')());
    }
    return app;
  }
}

module.exports = ExpressCoreMixin;
