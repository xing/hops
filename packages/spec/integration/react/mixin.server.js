const { Mixin } = require('@untool/core');

class ServerDataMixin extends Mixin {
  getServerData(req) {
    return { method: req.method };
  }
}

module.exports = ServerDataMixin;
