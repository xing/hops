const bootstrapUntool = options => {
  process.env.UNTOOL_NSP = 'hops';
  const { bootstrap } = require('@untool/core');
  const { getConfig } = require('@untool/core/lib/config');

  const mixin = bootstrap();
  mixin.handleArguments(options);

  const logger = { info: mixin.logInfo, error: mixin.logError };

  return { logger, mixin, config: getConfig() };
};

module.exports = (options, callback) => {
  const runServer = require('hops-express').runServerWithContext;
  const { logger, mixin, config } = bootstrapUntool(options);

  runServer({ logger, hooks: mixin, options, config }, callback);
};
