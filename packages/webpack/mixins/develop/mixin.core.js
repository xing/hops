'use strict';

const { Mixin } = require('hops-bootstrap');

class WebpackDevelopMixin extends Mixin {
  configureServer(app, middlewares, mode) {
    if (mode === 'develop') {
      const webpack = require('webpack');
      const createWebpackDevMiddleware = require('webpack-dev-middleware');
      const createWebpackHotMiddleware = require('webpack-hot-middleware');
      const webpackDevelopConfig = this.getBuildConfig('develop');
      const compiler = webpack(webpackDevelopConfig);
      middlewares.initial.push(
        createWebpackDevMiddleware(compiler, {
          noInfo: true,
          logLevel: 'silent',
          publicPath: webpackDevelopConfig.output.publicPath,
          watchOptions: webpackDevelopConfig.watchOptions,
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
