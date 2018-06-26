const { Mixin } = require('@untool/core');

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-object-rest-spread')
    );

    return webpackConfig;
  }

  handleArguments(argv) {
    global._hopsCLIArguments = Object.assign({}, argv, { $0: 'hops' });
  }

  configureServer(app, middleware) {
    middleware.initial.push(
      function shouldPrefetchOnServer(req, res, next) {
        if (typeof res.locals.shouldPrefetchOnServer === 'undefined') {
          res.locals.shouldPrefetchOnServer = this.config.shouldPrefetchOnServer;
        }

        next();
      }.bind(this)
    );

    return app;
  }
}

module.exports = ReactCoreMixin;
