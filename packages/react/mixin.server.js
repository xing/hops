const { Mixin } = require('@untool/core');

class ReactServerMixin extends Mixin {
  filterEnvironmentVariables() {
    return this.config.environmentVariables.reduce((variables, name) => {
      variables[name] = process.env[name];
      return variables;
    }, {});
  }

  enhanceData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        _hopsCLIArguments: global._hopsCLIArguments,
        process: {
          env: this.filterEnvironmentVariables(),
        },
      },
    };
  }
}

module.exports = ReactServerMixin;
