const { Mixin } = require('@untool/core');
const strip = require('strip-indent');
const {
  async: { callable: callableAsync },
} = require('mixinable');

class LambdaMixin extends Mixin {
  deployLambda(parameterOverrides) {
    return require('./lib/deploy')(
      this.config,
      this.options,
      parameterOverrides
    );
  }

  destroyLambda() {
    return require('./lib/destroy')(this.config, this.options);
  }

  registerCommands(yargs) {
    return yargs.command('lambda', 'manage your lambda deployment', yargs =>
      yargs
        .usage('Usage: hops lambda <command>')
        .command({
          command: 'deploy',
          describe: 'Deploys your hops application to AWS lambda',
          handler: () => {
            this.deployLambda({});
          },
        })
        .command({
          command: 'destroy',
          describe:
            'Delete all AWS resources created by this hops application.',
          builder: {
            'keep-bucket': {
              type: 'boolean',
              default: false,
              describe: strip(`
                Set this to true if you want to delete all files in
                the S3 bucket but keep the bucket itself.
              `),
            },
            'keep-files': {
              type: 'boolean',
              default: false,
              describe: strip(`
                Set this to true if you want to keep all files in the
                S3 bucket.
              `),
            },
            yes: {
              type: 'boolean',
              default: false,
              describe: "Don't ask for confirmation.",
            },
          },
          handler: () => {
            this.destroyLambda();
          },
        })
        .help('help')
        .demandCommand()
    );
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

LambdaMixin.strategies = {
  deployLambda: callableAsync,
  destroyLambda: callableAsync,
};

module.exports = LambdaMixin;
