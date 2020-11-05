const { sync } = require('mixinable');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');
const { createLogger, logLevels } = require('.');

const { callable } = sync;
const { validate, invariant } = bootstrap;

class LogMixin extends Mixin {
  constructor(...args) {
    super(...args);

    this.logger = createLogger(this.config);
    this.handleArguments(this.options);
  }

  configureServer(app, middlewares, mode) {
    if (mode === 'static') {
      return;
    }

    middlewares.preinitial.unshift((_, res, next) => {
      Object.assign(res.locals, {
        logger: this.logger,
      });
      next();
    });
  }

  getLogger() {
    return this.logger;
  }

  registerCommands(yargs) {
    yargs
      .option('quiet', {
        alias: 'q',
        description: 'Decrease log output',
        count: true,
      })
      .option('verbose', {
        alias: 'v',
        description: 'Increase log output',
        count: true,
      })
      .option('color', {
        default: true,
        description: 'Enable colored log output',
        type: 'boolean',
      });
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
    const { quiet = 0, verbose = 0, _: commands = [] } = this.options;
    const command = commands.join(' ');
    const logger = this.getLogger();
    logger.setLogLevel(logLevels.info + verbose - quiet);
    const isChildProcess = typeof process.send === 'function';
    if (command && !isChildProcess) {
      logger.info(
        `running '${command}' in '${
          process.env.NODE_ENV || 'development'
        }' mode`
      );
    }
  }

  handleError(error) {
    this.getLogger().error(error);
  }

  inspectWarnings(warnings) {
    warnings.forEach((warning) => this.getLogger().warn(warning));
  }
}

LogMixin.strategies = {
  getLogger: validate(callable, ({ length }) => {
    invariant(length === 0, 'getLogger(): Received unexpected argument(s)');
  }),
};

module.exports = LogMixin;
