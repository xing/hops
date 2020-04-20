'use strict';

const chalk = require('chalk');

module.exports = class ConfigValidationMixin {
  constructor(config) {
    this.config = config;
    this.warnings = [];
  }
  validateConfig() {
    const { _warnings } = this.config;
    this.warnings = _warnings;
  }
  logResults(logger) {
    const { warnings } = this;
    if (warnings.length) {
      logger.warn(
        'Invalid configuration value(s) detected:\n' +
          warnings
            .map((message) => `${chalk.yellow('-')} ${message}`)
            .join('\n')
      );
      logger.hint(
        'Fix invalid configuration value(s):\n' +
          'Please review your project configuration and make sure to fix all ' +
          'issues reported above. Misconfiguration may lead to bugs and ' +
          'might break your application.'
      );
    }
  }
};
