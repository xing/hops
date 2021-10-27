import { parsePath } from 'history';
import { strategies } from 'hops-mixin';
import ReduxActionCreatorCommonMixin from './mixin.runtime-common';

const {
  sync: { sequence },
} = strategies;

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
      await this.dispatchAll(parsePath(this.request.originalUrl));
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

export default ReduxActionCreatorServerMixin;
