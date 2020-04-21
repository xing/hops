const { Mixin } = require('hops-bootstrap');

class WebpackStartMixin extends Mixin {
  registerCommands(yargs) {
    const { name } = this.config;

    yargs.command(
      this.configureCommand({
        command: 'start',
        describe: `Build and serve ${name}`,
        builder: {
          production: {
            alias: 'p',
            default: false,
            describe: 'Enable production mode',
            type: 'boolean',
          },
          clean: {
            alias: 'c',
            default: true,
            describe: 'Clean up before building',
            type: 'boolean',
          },
        },
        handler: (argv) => {
          if (process.env.NODE_ENV === 'production') {
            Promise.resolve(argv.clean && this.clean())
              .then(() => this.build())
              .then(() => this.runServer('serve'))
              .catch(this.handleError);
          } else {
            this.clean()
              .then(() => this.runServer('develop'))
              .catch(this.handleError);
          }
        },
      })
    );
  }
}

module.exports = WebpackStartMixin;
