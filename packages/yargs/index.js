'use strict';

const createYargs = require('yargs');

const {
  initialize,
  internal: { invariant },
} = require('hops-bootstrap');

const configure = (config, options) => ({
  run(...args) {
    try {
      const yargs = args.length ? createYargs(args) : createYargs;
      const { argv } = yargs.help(false);
      if (argv.production || argv.p) {
        process.env.NODE_ENV = 'production';
      }
      const {
        bootstrap,
        registerCommands,
        handleArguments,
        handleError,
      } = initialize(config, options);
      invariant(
        bootstrap && registerCommands && handleArguments && handleError,
        "Can't use hops-yargs mixin"
      );
      process.on('uncaughtException', handleError);
      process.on('unhandledRejection', handleError);
      bootstrap().then(() => {
        registerCommands(
          yargs
            .usage('Usage: $0 <command> [options]')
            .locale('en')
            .version(false)
            .help(true)
            .alias('help', 'h')
            .strict()
            .demandCommand(1, '')
            .check(handleArguments)
        );
        yargs.parse();
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.stack ? error.stack.toString() : error.toString());
      process.exit(1);
    }
  },
  configure,
});

module.exports = configure();
