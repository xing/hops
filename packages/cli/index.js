'use strict';

module.exports = {
  get init() {
    return require('./lib/init');
  },
  get run() {
    return require('./lib/run');
  },
};
