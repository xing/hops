const {
  Mixin,
  strategies: {
    sync: { pipe: pipeSync },
    async: { override: overrideAsync },
  },
} = require('hops-mixin');

class ReactFetchMixin extends Mixin {
  fetch(...fetchArgs) {
    return this.configureFetch(require('isomorphic-fetch'))(...fetchArgs);
  }
}

ReactFetchMixin.strategies = {
  configureFetch: pipeSync,
  fetch: overrideAsync,
};

module.exports = ReactFetchMixin;
