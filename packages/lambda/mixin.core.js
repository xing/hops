const { Mixin } = require('@untool/core');
const strip = require('strip-indent');

class LambdaMixin extends Mixin {
  registerCommands(yargs) {
    return yargs.command('lambda', 'manage your lambda deployment', yargs =>
      yargs
        .usage('Usage: hops lambda <command>')
        .command({
          command: 'deploy',
          describe: 'Deploys your hops application to AWS lambda',
          handler: argv => {
            return require('./index').deploy(this.config, argv);
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
          handler: argv => {
            return require('./index').destroy(this.config, argv);
          },
        })
        .help('help')
        .demandCommand()
    );
  }
}

module.exports = LambdaMixin;
