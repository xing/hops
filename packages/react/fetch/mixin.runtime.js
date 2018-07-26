const { Mixin } = require('@untool/core');
const {
  sync: { pipe: pipeSync },
  async: { override: overrideAsync },
} = require('mixinable');

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
