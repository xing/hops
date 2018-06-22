// eslint-disable-next-line import/no-internal-modules
const { createLocation } = require('history/LocationUtils');

const ReduxActionCreatorCommonMixin = require('./mixin.runtime-common');

class ReduxActionCreatorServerMixin extends ReduxActionCreatorCommonMixin {
  bootstrap(request, response) {
    this.isStatic = response.locals._hopsStatic;
    // with server side rendering, all actions will be dispatched in order to include server side information
    // for the template. This can be disabled with the options flag disableServerSideRendering when you only
    // want rendering to happen on the client side. This is useful for situations where you have dynamic routes
    // on the client and want to prevent rendering wrong information into the clients templates.
    if (!this.isStatic && !this.options.disableServerSideRendering) {
      return this.dispatchAll(createLocation(request.path));
    }
    return Promise.resolve();
  }

  enhanceData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        _hopsStatic: this.isStatic,
      },
    };
  }
}

module.exports = ReduxActionCreatorServerMixin;
