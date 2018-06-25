const { Mixin } = require('@untool/core');

class ReduxActionCreatorDispatcherCoreMixin extends Mixin {
  handleArguments(cliArgs) {
    this.cliArgs = cliArgs;
  }

  configureServer(app, middleware) {
    middleware.initial.push((req, res, next) => {
      res.locals._hopsStatic = this.cliArgs.static;
      next();
    });

    return app;
  }
}

module.exports = ReduxActionCreatorDispatcherCoreMixin;
