const { Mixin } = require('hops-mixin');
const { createCompiler } = require('../../lib/utils/compiler');

class WebpackDevelopMixin extends Mixin {
  configureServer(app, middlewares, mode) {
    if (mode === 'develop') {
      const createWebpackDevMiddleware = require('webpack-dev-middleware');
      const createWebpackHotMiddleware = require('webpack-hot-middleware');
      const webpackDevelopConfig = this.getBuildConfig('develop');
      const compiler = createCompiler(webpackDevelopConfig);

      middlewares.initial.push(
        createWebpackDevMiddleware(compiler, { stats: false }),
        createWebpackHotMiddleware(compiler, { log: false })
      );
    }
  }

  registerCommands(yargs) {
    const { name } = this.config;
    yargs.command(
      this.configureCommand({
        command: 'develop',
        describe: `Serve ${name} in watch mode`,
        builder: {},
        handler: () =>
          this.clean()
            .then(this.runServer.bind(this, 'develop'))
            .catch(this.handleError),
      })
    );
  }
}

module.exports = WebpackDevelopMixin;
