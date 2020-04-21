const chalk = require('chalk');
const detectDuplicates = require('duplitect');

module.exports = class DetectDuplicatePackagesMixin {
  constructor(config) {
    this.config = config;
    this.duplicates = [];
  }

  detectDuplicatePackages(...packages) {
    const { _workspace } = this.config;
    const duplicates = detectDuplicates(_workspace, ...packages);
    this.duplicates.push(
      ...duplicates.map(
        (name) => `package "${name}" may not be installed more than once`
      )
    );
  }

  logResults(logger) {
    const { duplicates } = this;

    if (duplicates.length) {
      const warnings = duplicates.map((name) => `${chalk.yellow('-')} ${name}`);
      logger.warn(
        'Problematic duplicate package(s) detected:\n' + warnings.join('\n')
      );

      logger.hint(
        'Fix duplicate package(s):\n' +
          'Please use your package manager of choice (npm or yarn) to ' +
          'identify and remove duplicate/redundant versions of the packages ' +
          'mentioned above. Failing to do so will almost certainly lead to ' +
          'hard to debug issues with your application.'
      );
    }
  }
};
