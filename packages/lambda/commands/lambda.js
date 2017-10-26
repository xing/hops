#!/usr/bin/env node
'use strict';

module.exports = function defineLambdaCommand (yargs) {
  yargs.command('lambda', 'manage your lambda deployment', function (yargs) {
    yargs.usage('Usage: $0 lambda <command>')
      .command({
        command: 'deploy',
        describe: 'Deploys your hops application to AWS lambda',
        builder: {},
        handler: require('..').deploy
      })
      .command({
        command: 'destroy',
        describe: 'Delete all AWS resources created by this hops application.',
        builder: {
          'keep-bucket': {
            type: 'boolean',
            default: false,
            describe: 'Set this to true if you want to delete all files in ' +
            'the S3 bucket but keep the bucket itself.'
          },
          'keep-files': {
            type: 'boolean',
            default: false,
            describe: 'Set this to true if you want to keep all files in the ' +
            'S3 bucket.'
          },
          yes: {
            type: 'boolean',
            default: false,
            describe: 'Don\'t ask for confirmation.'
          }
        },
        handler: require('..').destroy
      })
      .help('help')
      .demandCommand();
  });
};

if (require.main === module) {
  require('hops-local-cli').run(module.exports, 'lambda');
}
