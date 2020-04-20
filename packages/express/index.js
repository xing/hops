'use strict';

const { initialize } = require('hops-bootstrap');

const configure = (config, options) => ({
  runServer(...args) {
    return initialize(config, options).runServer(...args);
  },
  createServer(...args) {
    return initialize(config, options).createServer(...args);
  },
  createRenderer(...args) {
    return initialize(config, options).createRenderer(...args);
  },
  configure,
});

module.exports = configure();
