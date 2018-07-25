const { Mixin } = require('@untool/core');

class ServerDataMixin extends Mixin {
  enhanceServerData(data, req) {
    return { ...data, method: req.method };
  }
}

module.exports = ServerDataMixin;
