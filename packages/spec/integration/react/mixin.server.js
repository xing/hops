const { Mixin } = require('hops-mixin');

class ServerDataMixin extends Mixin {
  enhanceServerData(data, req) {
    return { ...data, method: req.method };
  }
}

module.exports = ServerDataMixin;
