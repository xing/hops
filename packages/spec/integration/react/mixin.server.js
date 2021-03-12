import { Mixin } from 'hops-mixin';

class ServerDataMixin extends Mixin {
  enhanceServerData(data, req) {
    return { ...data, method: req.method };
  }
}

export default ServerDataMixin;
