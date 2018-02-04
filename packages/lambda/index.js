'use strict';

module.exports = {
  get deploy() {
    return require('./lib/deploy');
  },
  get destroy() {
    return require('./lib/destroy');
  },
};
