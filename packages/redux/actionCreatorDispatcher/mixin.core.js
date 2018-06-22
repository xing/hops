const { Mixin } = require('@untool/core');

class ReduxActionCreatorDispatcherCoreMixin extends Mixin {
  handleArguments(cliArgs) {
    this.cliArgs = cliArgs;
  }

  initializeServer(app) {
    app.use((req, res, next) => {
      res.locals._hopsStatic = this.cliArgs.static;
      next();
    });
  }
}

module.exports = ReduxActionCreatorDispatcherCoreMixin;
