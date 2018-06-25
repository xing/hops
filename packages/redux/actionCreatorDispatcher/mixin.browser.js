const ReduxActionCreatorCommonMixin = require('./mixin.runtime-common');

class ReduxActionCreatorBrowserMixin extends ReduxActionCreatorCommonMixin {
  constructor(...args) {
    super(...args);
    this.prefetchedOnServer = global._hopsPrefetchedOnServer;
  }
}

module.exports = ReduxActionCreatorBrowserMixin;
