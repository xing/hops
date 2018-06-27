// eslint-disable-next-line import/no-internal-modules
const { createLocation } = require('history/LocationUtils');

const ReduxActionCreatorCommonMixin = require('./mixin.runtime-common');

class ReduxActionCreatorServerMixin extends ReduxActionCreatorCommonMixin {
  bootstrap(request, response) {
    this.prefetchedOnServer = response.locals.shouldPrefetchOnServer === true;

    if (this.prefetchedOnServer) {
      return this.dispatchAll(createLocation(request.path));
    }
    return Promise.resolve();
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

module.exports = ReduxActionCreatorServerMixin;
