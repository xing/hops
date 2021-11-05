const { Mixin } = require('hops-mixin');

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
          fastDev: {
            default: false,
            describe:
              'Experimental: Enable faster development mode (modern browsers only)',
            type: 'boolean',
          },
          experimentalEsbuild: {
            default: process.env.USE_EXPERIMENTAL_ESBUILD === 'true',
            describe: 'Use esbuild for transpilation (experimental)',
            type: 'boolean',
          },
          experimentalSWC: {
            alias: 'experimental-swc',
            default: process.env.USE_EXPERIMENTAL_SWC === 'true',
            describe: 'Use SWC for transpilation (experimental)',
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
