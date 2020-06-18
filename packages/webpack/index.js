'use strict';

const { initialize } = require('hops-bootstrap');

const { createRenderMiddleware } = require('./lib/middlewares/render');
const { createStatsMiddleware } = require('./lib/middlewares/stats');

const { RenderPlugin } = require('./lib/plugins/render');
const { StatsWritePlugin } = require('./lib/plugins/stats');

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
  getWebpackConfig(...args) {
    return initialize(config, options).getWebpackConfig(...args);
  },
  internal: {
    createWebpackMiddleware: createRenderMiddleware,
    createStatsMiddleware,
    RenderPlugin,
    StatsWritePlugin,
    BuildError,
    configLoader,
  },
  configure,
});

module.exports = configure();
