const { Mixin } = require('hops-bootstrap');
const { createCompiler } = require('../../lib/utils/compiler');

class WebpackDevelopMixin extends Mixin {
  configureServer(app, middlewares, mode) {
    if (mode === 'develop') {
      const webpackConfig = this.getWebpackConfig('develop', 'web', {
        develop: true,
      });
      const compiler = createCompiler(webpackConfig);
      const createWebpackDevMiddleware = require('webpack-dev-middleware');
      const createWebpackHotMiddleware = require('webpack-hot-middleware');

      middlewares.initial.push(
        createWebpackDevMiddleware(compiler, {
          noInfo: true,
          logLevel: 'silent',
          publicPath: webpackConfig.output.publicPath,
          watchOptions: webpackConfig.watchOptions,
        }),
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
