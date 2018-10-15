'use strict';

const { format } = require('url');
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

module.exports = class CLIMixin {
  constructor(config, options) {
    this.config = config;
    this.options = options;
  }
  registerCommands(yargs) {
    yargs.option('quiet', {
      alias: 'q',
      description: 'Silence log output',
      type: 'boolean',
    });
  }
  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
    const { quiet } = this.options;
    const { name } = this.config;
    if (!quiet) {
      console.log(
        `[${name}] started in ${process.env.NODE_ENV || 'development'} mode`
      );
    }
  }
  configureBuild(webpackConfig, loaderConfigs, target) {
    if (target !== 'build') {
      const { quiet } = this.options;
      if (!quiet) {
        webpackConfig.plugins.push(new HopsWebpackLoggerPlugin());
      }
    }
  }
  inspectBuild(stats) {
    const { quiet } = this.options;
    const { name } = this.config;
    if (!quiet) {
      console.log(
        `[${name}] built successfully\n${stats.toString({
          colors: false,
          version: false,
          hash: false,
          modules: false,
          entrypoints: false,
          chunks: false,
        })}`
      );
    }
  }
  inspectServer(server) {
    const { quiet } = this.options;
    const { https, basePath: pathname } = this.config;
    if (!quiet) {
      const { address, port } = server.address();
      const info = {
        protocol: https ? 'https' : 'http',
        hostname: ['::', '::1', '0.0.0.0', '127.0.0.1'].includes(address)
          ? 'localhost'
          : address,
        pathname,
        port,
      };
      console.log(`Server listening at ${format(info)}`);
    }
  }
};
