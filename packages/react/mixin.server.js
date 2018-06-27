const { Mixin } = require('@untool/core');

class ReactServerMixin extends Mixin {
  filterEnvironmentVariables() {
    return this.config.environmentVariables.reduce((variables, name) => {
      variables[name] = process.env[name];
      return variables;
    }, {});
  }

  getTemplateData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        _hopsCLIArguments: global._hopsCLIArguments,
        _hopsEnvironmentVariables: this.filterEnvironmentVariables(),
      },
    };
  }
}

module.exports = ReactServerMixin;
