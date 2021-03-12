import ReduxActionCreatorCommonMixin from './mixin.runtime-common';

class ReduxActionCreatorBrowserMixin extends ReduxActionCreatorCommonMixin {
  constructor(...args) {
    super(...args);
    this.prefetchedOnServer = global._hopsPrefetchedOnServer;
  }
}

export default ReduxActionCreatorBrowserMixin;
