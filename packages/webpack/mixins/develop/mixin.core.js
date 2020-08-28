const { join, trimSlashes } = require('pathifist');
const { Mixin } = require('hops-bootstrap');
const { createCompiler } = require('../../lib/utils/compiler');

class WebpackDevelopMixin extends Mixin {
  configureWebpack(webpackConfig, loaderConfigs, buildName, buildTarget) {
    if (buildName !== 'develop' || buildTarget !== 'browser') {
      return;
    }

    const {
      HotModuleReplacementPlugin,
      optimize: { ModuleConcatenationPlugin },
    } = require('webpack');

    webpackConfig.plugins = webpackConfig.plugins.filter(
      (p) => !(p instanceof ModuleConcatenationPlugin)
    );

    const { assetPath, name } = this.config;
    const getAssetPath = (...arg) => trimSlashes(join(assetPath, ...arg));

    Object.assign(webpackConfig, {
      mode: 'development',
      entry: require.resolve('../../lib/shims/develop'),
      output: {
        ...webpackConfig.output,
        filename: getAssetPath(`${name}.js`),
        chunkFilename: getAssetPath(`${name}-[id].js`),
      },
      optimization: {
        ...webpackConfig.optimization,
        minimizer: undefined,
      },
      plugins: [...webpackConfig.plugins, new HotModuleReplacementPlugin()],
      performance: {
        hints: false,
        maxEntrypointSize: 5242880,
        maxAssetSize: 5242880,
      },
      devtool: 'cheap-module-eval-source-map',
      watchOptions: { aggregateTimeout: 300, ignored: /node_modules/ },
    });
  }

  configureServer(app, middlewares, mode) {
    if (mode === 'develop') {
      const createWebpackDevMiddleware = require('webpack-dev-middleware');
      const createWebpackHotMiddleware = require('webpack-hot-middleware');
      const webpackDevelopConfig = this.getWebpackConfig('develop', 'browser');
      const compiler = createCompiler(webpackDevelopConfig);

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
