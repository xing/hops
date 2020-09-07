const { existsSync: exists } = require('fs');
const { join } = require('path');
const isPlainObject = require('is-plain-obj');
const EnhancedPromise = require('eprom');
const { async } = require('mixinable');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');
const { StatsWritePlugin } = require('../../lib/plugins/stats');

const { callable } = async;
const { validate, invariant } = bootstrap;

class WebpackStatsMixin extends Mixin {
  constructor(...args) {
    super(...args);

    this.statsPromise = new EnhancedPromise();
  }

  getBuildStats() {
    return Promise.resolve(this.statsPromise);
  }

  configureBuild(webpackConfig, loaderConfigs, target) {
    const { plugins } = webpackConfig;

    if (target === 'develop' || target === 'build') {
      const statsFile = join(this.config.serverDir, this.config.statsFile);

      plugins.unshift(new StatsWritePlugin(this.statsPromise, statsFile));
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
