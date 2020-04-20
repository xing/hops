'use strict';

const { initialize } = require('@untool/core');

const createWebpackMiddleware = require('./lib/middlewares/render');
const createStatsMiddleware = require('./lib/middlewares/stats');

const { RenderPlugin } = require('./lib/plugins/render');
const { StatsPlugin, StatsFilePlugin } = require('./lib/plugins/stats');

const { BuildError } = require('./lib/utils/errors');
const configLoader = require('./lib/utils/loader');

const configure = (config, options) => ({
  clean(...args) {
    return initialize(config, options).clean(...args);
  },
  build(...args) {
    return initialize(config, options).build(...args);
  },
  getBuildConfig(...args) {
    return initialize(config, options).getBuildConfig(...args);
  },
  internal: {
    createWebpackMiddleware,
    createStatsMiddleware,
    RenderPlugin,
    StatsPlugin,
    StatsFilePlugin,
    BuildError,
    configLoader,
  },
  configure,
});

module.exports = configure();
