const { format } = require('url');
const { Mixin } = require('@untool/core');

class ExpressCoreMixin extends Mixin {
  inspectServer(app) {
    const { port, address: host } = app.address();
    console.log(
      'server listening at %s',
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
