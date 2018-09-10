'use strict';

module.exports = {
  get init() {
    return require('./lib/init').init;
  },
  get run() {
    return require('./lib/run').run;
  },
};
