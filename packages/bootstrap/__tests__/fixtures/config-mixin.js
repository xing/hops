const { callable } = require('mixinable');
// eslint-disable-next-line node/no-extraneous-require
const { Mixin } = require('hops-mixin');

class ConfigMixin extends Mixin {
  constructor(...args) {
    super(...args);
  }

  getConfig() {
    return this.config;
  }
}

ConfigMixin.strategies = {
  getConfig: callable,
};

module.exports = ConfigMixin;
