const debug = require('debug')('hops:webpack:stats');
const { sync, async } = require('mixinable');
const { Mixin, internal: bootstrap } = require('hops-bootstrap');
const findUp = require('find-up');
const { dirname } = require('path');
const { getDuplicatesDetails } = require('duplitect');
const semver = require('semver');
const chalk = require('chalk');

const { sequence } = sync;
const { callable } = async;
const { validate, invariant } = bootstrap;

const prettyPrintCoreJsVersions = (versions) =>
  versions
    .map(({ version: v, pathName: p }, i) => `${++i}) v${v}\tLocation: ${p}`)
    .join('\n');

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
    findUp('yarn.lock').then(async (yarnLockPath) => {
      if (!yarnLockPath) {
        return;
      }

      const rootDir = dirname(yarnLockPath);
      const coreJsVersions = (await getDuplicatesDetails(rootDir, 'core-js'))
        .filter(({ name }) => name === 'core-js')
        .map(({ version, pathName }) => ({
          pathName: dirname(pathName).replace(rootDir, ''),
          major: semver.major(version),
          version,
        }));

      const distinctCoreJsMajorVersions = coreJsVersions.reduce(
        (distinct, coreJs) => {
          if (!distinct.some(({ major }) => major === coreJs.major)) {
            distinct.push(coreJs);
          }
          return distinct;
        },
        []
      );

      if (distinctCoreJsMajorVersions.length > 1) {
        const listOfVersions = prettyPrintCoreJsVersions(
          distinctCoreJsMajorVersions.sort((a, b) => b.major > a.major)
        );
        const message = chalk.red(`
There are mismatching major versions of "core-js" in your project.

${listOfVersions}

This is likely caused by one of the project's dependencies bringing
their own version of "core-js". Unfortunately there can only be one
major version of this package. Otherwise the deep imports, that are
used for integrating this package, break. Which might lead to resolve
errors like "Can't resolve 'core-js/...' in '...'"

To fix this situation, remove every occurrence of the core-js package,
except the top-level one.
`);

        console.log(message);
      }
    });
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
};

module.exports = WebpackBuildMixin;
