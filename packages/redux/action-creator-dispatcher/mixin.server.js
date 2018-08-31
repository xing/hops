// eslint-disable-next-line import/no-internal-modules
const { createLocation } = require('history/LocationUtils');
const {
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');

const ReduxActionCreatorCommonMixin = require('./mixin.runtime-common');

class ReduxActionCreatorServerMixin extends ReduxActionCreatorCommonMixin {
  bootstrap(request) {
    this.request = request;
    this.prefetchedOnServer = this.shouldPrefetchOnServer();
  }

  shouldPrefetchOnServer() {
    const { shouldPrefetchOnServer } = this.config;
    return typeof shouldPrefetchOnServer === 'boolean'
      ? shouldPrefetchOnServer
      : true;
  }

  async fetchData(data) {
    if (this.prefetchedOnServer) {
      await this.dispatchAll(createLocation(this.request.path));
    }

    return data;
  }

  getTemplateData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        _hopsPrefetchedOnServer: this.prefetchedOnServer,
      },
    };
  }
}

ReduxActionCreatorServerMixin.strategies = {
  shouldPrefetchOnServer: override,
};

module.exports = ReduxActionCreatorServerMixin;
