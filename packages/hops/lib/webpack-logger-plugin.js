'use strict';

const prettyMS = require('pretty-ms');

class HopsWebpackLoggerPlugin {
  constructor(options) {
    this.lastHashes = {};
    this.name = options.name;
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, stats => {
      const { name: mode } = stats.compilation;
      if (this.lastHashes[mode] === stats.hash) {
        return;
      }
      this.lastHashes[mode] = stats.hash;
      const hasWarnings = stats.hasWarnings();
      const hasErrors = stats.hasErrors();
      const { errors, warnings, children } = stats.toJson({
        all: false,
        errors: true,
        children: true,
        moduleTrace: true,
        warnings: true,
      });
      const allWarnings = warnings.concat(...children.map(c => c.warnings));
      const allErrors = errors.concat(...children.map(c => c.errors));

      console.log(
        `[${this.name}]`,
        hasErrors
          ? `Compilation ${mode} failed after`
          : `Compiled ${mode} ${
              hasWarnings ? 'with warnings' : 'successfully'
            } in`,
        prettyMS(stats.endTime - stats.startTime)
      );

      allErrors.forEach(error => console.log(`ERROR in: ${error}\n`));
      allWarnings.forEach(warning => console.log(`WARNING in ${warning}\n`));
    });
  }
}

module.exports = HopsWebpackLoggerPlugin;
