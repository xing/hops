const ReduxActionCreatorCommonMixin = require('./mixin.runtime-common');

class ReduxActionCreatorBrowserMixin extends ReduxActionCreatorCommonMixin {
  constructor(...args) {
    super(...args);
    this.isStatic = global._hopsStatic;
  }
}

module.exports = ReduxActionCreatorBrowserMixin;
