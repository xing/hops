const {
  sync: { pipe },
} = require('mixinable');

const { Mixin } = require('@untool/core');
const webpack = require('webpack');
const {
  build: buildConfig,
  node: nodeConfig,
  develop: developConfig,
} = require('hops-build-config');

const defaultGenerate = require('./lib/generate');
const cleanup = require('./lib/cleanup');

class BuildMixin extends Mixin {
  getNodeConfig() {
    return this.configureWebpack(nodeConfig, 'node');
  }

  getBuildConfig() {
    return this.configureWebpack(buildConfig, 'build');
  }

  getDevelopConfig() {
    return this.configureWebpack(developConfig, 'develop');
  }

  build(options, callback) {
    const logCallback = (error, stats) => {
      if (error) {
        this.logError(error.stack ? error.stack.toString() : error.toString());
      } else {
        this.logStats(stats);
      }
      callback(error, stats);
    };
    const build = () => {
      if (options.static) {
        webpack(this.getBuildConfig()).run((error, stats) => {
          if (error) {
            this.logError(error);
          } else {
            const generate = this.config.generate || defaultGenerate;
            generate(this.getNodeConfig())
              .then(logCallback)
              .catch(logCallback);
          }
        });
      } else {
        webpack([this.getBuildConfig(), this.getNodeConfig()]).run(logCallback);
      }
    };
    if (options.clean) {
      const dirs = [this.config.buildDir, this.config.cacheDir];
      cleanup(dirs).then(build);
    } else {
      build();
    }
  }

  develop(options) {}

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
          this.build(argv, (error, stats) => {
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

BuildMixin.strategies = {
  configureWebpack: pipe,
};

module.exports = BuildMixin;
