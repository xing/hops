const {
  sync: { sequence },
} = require('mixinable');
const { Mixin } = require('@untool/core');

const { runServerWithContext } = require('./index');

class ExpressMixin extends Mixin {
  runServer(options) {
    const {
      config,
      createServerMiddleware,
      initializeServer,
      bootstrap,
      teardown,
      logError,
      logInfo,
    } = this;
    const hooks = {
      createServerMiddleware,
      initializeServer,
      bootstrap,
      teardown,
    };
    const logger = { error: logError, info: logInfo };
    runServerWithContext({ options, config, hooks, logger });
  }

  registerCommands(yargs) {
    const { namespace } = this.config;
    return yargs.command({
      command: 'serve',
      describe: `Serve ${namespace}`,
      builder: {
        production: {
          alias: 'p',
          default: true,
          describe: 'Enable production mode',
          type: 'boolean',
        },
        static: {
          alias: 's',
          default: false,
          describe: 'Only serve static locations',
          type: 'boolean',
        },
      },
      handler: argv => {
        if (argv.production) {
          process.env.NODE_ENV = 'production';
        }
        if (argv.static) {
          process.env.HOPS_MODE = 'static';
        }
        this.runServer(argv);
      },
    });
  }
}

ExpressMixin.strategies = {
  createServerMiddleware: sequence,
  initializeServer: sequence,
  bootstrap: sequence,
  teardown: sequence,
};

module.exports = ExpressMixin;
