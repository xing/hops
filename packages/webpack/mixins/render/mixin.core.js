const { join } = require('path');
const { Mixin } = require('hops-mixin');
const {
  createRenderMiddleware,
  tryLoadRenderMiddleware,
} = require('../../lib/middlewares/render');

class WebpackRenderMixin extends Mixin {
  configureServer(app, middlewares, mode) {
    if (mode === 'develop') {
      middlewares.routes.push(
        createRenderMiddleware(['node'], mode === 'develop', this)
      );
    } else if (mode === 'serve') {
      const { serverDir, serverFile } = this.config;
      const middleware = tryLoadRenderMiddleware(join(serverDir, serverFile));

      if (middleware) {
        middlewares.routes.push(middleware);
      }
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = WebpackRenderMixin;
