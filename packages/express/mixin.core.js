const { Mixin } = require('@untool/core');

class ExpressMixin extends Mixin {
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
        require('./index').runServer(argv);
      },
    });
  }
}

module.exports = ExpressMixin;
