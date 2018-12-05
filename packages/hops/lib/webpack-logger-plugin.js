'use strict';

const prettyMS = require('pretty-ms');

class HopsWebpackLoggerPlugin {
  constructor() {
    this.lastHashes = {};
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, stats => {
      const { name } = stats.compilation;
      if (this.lastHashes[name] === stats.hash) {
        return;
      }
      this.lastHashes[name] = stats.hash;
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
        hasErrors
          ? `Compilation ${name} failed after`
          : `Compiled ${name} ${
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
