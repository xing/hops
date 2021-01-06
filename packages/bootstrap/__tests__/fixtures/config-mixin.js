const { callable } = require('mixinable');
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
