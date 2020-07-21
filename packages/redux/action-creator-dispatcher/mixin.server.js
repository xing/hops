const { createLocation } = require('history');
const {
  strategies: {
    sync: { sequence },
  },
} = require('hops-mixin');

const ReduxActionCreatorCommonMixin = require('./mixin.runtime-common');

class ReduxActionCreatorServerMixin extends ReduxActionCreatorCommonMixin {
  constructor(...args) {
    super(...args);
    this.prefetchedOnServer = false;
  }

  bootstrap(request) {
    this.request = request;
  }

  canPrefetchOnServer() {
    return this.config.allowServerSideDataFetching !== false;
  }

  async fetchData(data) {
    if (this.canPrefetchOnServer().every((value) => value)) {
      await this.dispatchAll(createLocation(this.request.originalUrl));
      this.prefetchedOnServer = true;
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
  canPrefetchOnServer: sequence,
};

module.exports = ReduxActionCreatorServerMixin;
