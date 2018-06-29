const { format } = require('url');
const { Mixin } = require('@untool/core');

class ExpressCoreMixin extends Mixin {
  configureServer(app, middleware, mode) {
    if (mode === 'serve' && process.env.NODE_ENV === 'production') {
      middleware.prefiles.push(require('compression')());
    }
    return app;
  }

  inspectServer(app) {
    const { port, address: host } = app.address();
    console.log(
      'Server listening at %s',
      format({
        protocol: this.config.https ? 'https' : 'http',
        hostname: ['0.0.0.0', '127.0.0.1'].includes(host) ? 'localhost' : host,
        pathname: this.config.basePath,
        port,
      })
    );
  }
}

module.exports = ExpressCoreMixin;
