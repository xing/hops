'use strict';

const { initialize } = require('@untool/core');

const configure = (config, options) => ({
  getLogger(...args) {
    return initialize(config, options).getLogger(...args);
  },
  configure,
});

module.exports = configure();
