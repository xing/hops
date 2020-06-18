const { existsSync: exists } = require('fs');
const { join } = require('path');
const isPlainObject = require('is-plain-obj');
const EnhancedPromise = require('eprom');
const { async } = require('mixinable');
const { Mixin, internal: bootstrap } = require('hops-bootstrap');
const {
  StatsPlugin,
  StatsWritePlugin,
  StatsFilePlugin,
} = require('../../lib/plugins/stats');

const { callable } = async;
const { validate, invariant } = bootstrap;

class WebpackStatsMixin extends Mixin {
  constructor(...args) {
    super(...args);

    this.statsPromise = new EnhancedPromise();
    this.handleArguments(this.options);
  }

  getBuildStats() {
    return Promise.resolve(this.statsPromise);
  }

  configureBuild(webpackConfig, loaderConfigs, target) {
    const { plugins } = webpackConfig;

    if (target === 'build' && this.options.parallelBuild) {
      const { serverDir, statsFile } = this.config;

      plugins.unshift(new StatsWritePlugin(join(serverDir, statsFile)));
    } else if (target === 'develop' || target === 'build') {
      plugins.unshift(new StatsPlugin(this.statsPromise));
    } else if (target === 'node' && this.writeStats) {
      plugins.unshift(new StatsFilePlugin(this.statsPromise, this.config));
    }
  }

  configureServer(app, middlewares, mode) {
    if (mode === 'serve') {
      const { serverDir, statsFile } = this.config;
      const statsFilePath = join(serverDir, statsFile);

      this.statsPromise.resolve(
        exists(statsFilePath) ? require(statsFilePath) : {}
      );
    }

    const { createStatsMiddleware } = require('../../lib/middlewares/stats');

    middlewares.preroutes.push(createStatsMiddleware(this.statsPromise));
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
    const { _: commands = [] } = this.options;
    const isProduction = process.env.NODE_ENV === 'production';
    this.writeStats =
      this.options.parallelBuild !== true &&
      (commands.includes('build') ||
        (commands.includes('start') && isProduction));
  }
}

WebpackStatsMixin.strategies = {
  getBuildStats: validate(
    callable,
    ({ length }) => {
      invariant(
        length === 0,
        'getBuildStats(): Received unexpected argument(s)'
      );
    },
    (result) => {
      invariant(
        isPlainObject(result),
        'getBuildStats(): Returned invalid stats data'
      );
    }
  ),
};

module.exports = WebpackStatsMixin;
