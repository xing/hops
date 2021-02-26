const debug = require('debug')('hops:webpack:stats');
const { sync, async } = require('mixinable');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');

const { sequence } = sync;
const { callable } = async;
const { validate, invariant } = bootstrap;

const toPromise = (observable) =>
  new Promise((resolve, reject) => {
    observable.subscribe({
      next: resolve,
      error: reject,
    });
  });

class WebpackBuildMixin extends Mixin {
  clean() {
    const rimraf = require('rimraf');
    const { buildDir, serverDir } = this.config;

    return Promise.all([
      new Promise((resolve, reject) =>
        rimraf(buildDir, (error) => (error ? reject(error) : resolve()))
      ),
      new Promise((resolve, reject) =>
        rimraf(serverDir, (error) => (error ? reject(error) : resolve()))
      ),
    ]);
  }

  build() {
    const webpack = require('webpack');
    const { parallelBuild } = this.options;

    if (parallelBuild) {
      const { forkCompilation } = require('../../lib/utils/compiler');
      const buildRequests = [];
      this.collectBuildRequests(buildRequests);

      const compilations = buildRequests.map(({ buildName }) => {
        const compilation = forkCompilation(this, [buildName]);
        return toPromise(compilation);
      });

      return Promise.all(compilations).then((allStats) => {
        allStats.forEach((stats) => {
          if (stats instanceof webpack.Stats) {
            this.inspectBuild(stats);
          } else {
            debug(stats);
          }
        });
      });
    }

    const webpackConfigs = [];
    this.collectBuildConfigs(webpackConfigs);

    return new Promise((resolve, reject) =>
      webpack(
        webpackConfigs.length === 1 ? webpackConfigs[0] : webpackConfigs
      ).run((error, stats) => {
        if (error) {
          reject(error);
        } else if (stats.hasErrors()) {
          const { errors } = stats.toJson({ all: false, errors: true });
          reject(new Error(`Build failed with ${errors.length} error(s)`));
        } else {
          resolve(stats);
        }
      })
    ).then((stats) => {
      this.inspectBuild(stats, webpackConfigs);
      return stats;
    });
  }

  collectBuildRequests(requests) {
    requests.push({ buildName: 'node' });
    requests.push({ buildName: 'build' });
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }

  inspectBuild(stats) {
    debug(
      stats.toString({ chunks: false, modules: false, entrypoints: false })
    );
  }

  registerCommands(yargs) {
    const { name } = this.config;
    yargs.command(
      this.configureCommand({
        command: 'build',
        describe: `Build ${name}`,
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
          profile: {
            default: false,
            describe: 'Print performance profiling stats after each build',
            type: 'boolean',
          },
          fastBuild: {
            default: false,
            describe:
              'Experimental: increase build speed (modern browsers only)',
            type: 'boolean',
          },
          parallelBuild: {
            default: true,
            describe: 'Run webpack builds in parallel',
            type: 'boolean',
          },
          experimentalEsbuild: {
            default: false,
            describe: 'Use esbuild for transpilation (experimental)',
            type: 'boolean',
          },
        },
        handler: (argv) =>
          Promise.resolve(argv.clean && this.clean())
            .then(() => this.build())
            .catch(this.handleError),
      })
    );
  }

  diagnose({ detectDuplicatePackages }) {
    detectDuplicatePackages('webpack');
  }
}

WebpackBuildMixin.strategies = {
  clean: validate(
    callable,
    ({ length }) => {
      invariant(length === 0, 'clean(): Received unexpected argument(s)');
    },
    (result, isAsync) => {
      invariant(isAsync, 'clean(): Did not return a Promise');
    }
  ),
  build: validate(
    callable,
    ({ length }) => {
      invariant(length === 0, 'build(): Received unexpected argument(s)');
    },
    (result, isAsync) => {
      invariant(isAsync, 'build(): Did not return a Promise');
    }
  ),
  inspectBuild: validate(sequence, ([stats]) => {
    invariant(
      stats && typeof stats.toString === 'function',
      'inspectBuild(): Received invalid Webpack Stats object'
    );
  }),
  collectBuildRequests: validate(sequence, ([requests]) => {
    invariant(
      Array.isArray(requests),
      'collectBuildRequests(): Received invalid requests array'
    );
  }),
};

module.exports = WebpackBuildMixin;
