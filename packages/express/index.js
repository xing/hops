'use strict';

const bootstrapUntool = options => {
  process.env.UNTOOL_NSP = 'hops';
  const { bootstrap } = require('@untool/core');
  const { getConfig } = require('@untool/core/lib/config');

  const mixin = bootstrap();
  mixin.handleArguments(options);

  const logger = { info: mixin.logInfo, error: mixin.logError };

  return { logger, mixin, config: getConfig() };
};

const runServerWithContext = ({ options, config, hooks, logger }, callback) => {
  const app = require('./lib/app')(options, config, hooks);
  require('./lib/listen')(app, config, logger, callback);
};

module.exports = {
  runServerWithContext,
  runServer(options, callback) {
    const { logger, mixin, config } = bootstrapUntool(options);
    runServerWithContext({ logger, hooks: mixin, options, config }, callback);
  },
  get createApp() {
    return require('./lib/app');
  },
};
