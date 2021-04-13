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
        builder: {
          fastDev: {
            default: false,
            describe:
              'Experimental: Enable faster development mode (modern browsers only)',
            type: 'boolean',
          },
          experimentalEsbuild: {
            default: process.env.USE_EXPERIMENTAL_ESBUILD === 'true',
            describe: 'Use esbuild for transpilation (experimental)',
            type: 'boolean',
          },
        },
        handler: () =>
          this.clean()
            .then(this.runServer.bind(this, 'develop'))
            .catch(this.handleError),
      })
    );
  }
}

module.exports = WebpackDevelopMixin;
