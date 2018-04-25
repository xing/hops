const { Mixin } = require('@untool/core');

class BuildMixin extends Mixin {
  registerCommands(yargs) {
    return yargs
      .command({
        command: 'build',
        describe: 'Builds the browser and server JS bundles',
        builder: {
          static: {
            alias: 's',
            default: false,
            describe: 'Statically build locations',
            type: 'boolean',
          },
          clean: {
            alias: 'c',
            default: true,
            describe:
              'Clean up artifacts in build / cache directories before ' +
              'building',
            type: 'boolean',
          },
          production: {
            alias: 'p',
            default: false,
            describe:
              'Minifies the output, generates source maps and removes ' +
              'React developer warnings',
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
          require('./index').runBuild(argv, (error, stats) => {
            if (error) {
              console.error(
                error.stack ? error.stack.toString() : error.toString()
              );
            } else {
              console.log(
                stats.toString({
                  chunks: false,
                  modules: false,
                  entrypoints: false,
                })
              );
            }

            if (error || stats.hasErrors()) {
              process.exit(1);
            }
          });
        },
      })
      .command({
        command: 'develop',
        describe:
          'Starts a webpack-dev-server to enable local development with ' +
          'hot code reloading',
        builder: {
          static: {
            alias: 's',
            default: false,
            describe:
              'Serve app in hot mode with static env variable turned on',
            type: 'boolean',
          },
          clean: {
            alias: 'c',
            default: true,
            describe:
              'Clean up artifacts in build / cache directories before ' +
              'building',
            type: 'boolean',
          },
        },
        handler: argv => {
          if (argv.static) {
            process.env.HOPS_MODE = 'static';
          }
          require('./index').runServer(argv);
        },
      });
  }
}

module.exports = BuildMixin;
