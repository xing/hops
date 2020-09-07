const isPlainObject = require('is-plain-obj');
const { sync, async } = require('mixinable');

class Mixin {
  constructor(config, ...args) {
    const options = args[args.length - 1];
    this.config = config;
    this.options = isPlainObject(options) ? options : {};
  }
}

module.exports = {
  Mixin,
  strategies: { sync, async },
};
