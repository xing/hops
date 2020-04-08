const { createLocation } = require('history');
const {
  strategies: {
    sync: { sequence },
  },
} = require('hops-mixin');
const deprecate = require('depd')('hops-redux');

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
    const { shouldPrefetchOnServer, allowServerSideDataFetching } = this.config;

    if (typeof shouldPrefetchOnServer === 'boolean') {
      deprecate(
        '[DEP0003] The config property "shouldPrefetchOnServer" is deprecated and will' +
          ' be removed in favor of the property "allowServerSideDataFetching" in the next' +
          ' major release of Hops.'
      );
    }

    return (
      shouldPrefetchOnServer !== false && allowServerSideDataFetching !== false
    );
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
