'use strict';

const runServer = require('./lib/run-server');

const createNodeAPI = (options, hookWhitelist = []) => {
  process.env.UNTOOL_NSP = 'hops';
  const { bootstrap } = require('@untool/core');
  const { getConfig } = require('@untool/core/lib/config');

  const mixin = bootstrap();
  mixin.handleArguments(options);

  const logger = { info: mixin.logInfo, error: mixin.logError };
  const hooks = hookWhitelist.reduce((hooks, name) => {
    hooks[name] = mixin[name];
    return hooks;
  }, {});

  return { logger, hooks, config: getConfig() };
};

module.exports = {
  runServer: function(options, callback) {
    const { logger, hooks, config } = createNodeAPI(options, [
      'bootstrap',
      'teardown',
    ]);
    runServer({ logger, hooks, options, config }, callback);
  },
  get createApp() {
    return require('./lib/app');
  },
};
