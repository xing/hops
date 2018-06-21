const { Mixin } = require('@untool/core');

class ReactServerMixin extends Mixin {
  enhanceData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        _hopsCLIArguments: global._hopsCLIArguments,
      },
    };
  }
}

module.exports = ReactServerMixin;
