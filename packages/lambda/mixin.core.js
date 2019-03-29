const {
  Mixin,
  strategies: {
    async: { callable: callableAsync },
  },
} = require('hops-mixin');
const { trimSlashes } = require('pathifist');
const semver = require('semver');
const strip = require('strip-indent');

const MAX_NODE_VERSION = '8.10';
const getAWSConfig = require('./lib/aws-config');

class LambdaMixin extends Mixin {
  constructor(config, ...args) {
    super(config, ...args);

    this.awsConfig = getAWSConfig(this.config);
  }

  deployLambda(parameterOverrides) {
    return require('./lib/deploy')(
      { hopsConfig: this.config, awsConfig: this.awsConfig },
      this.options,
      parameterOverrides,
      typeof this.getLogger === 'function' ? this.getLogger() : null
    );
  }

  destroyLambda() {
    return require('./lib/destroy')(
      { hopsConfig: this.config, awsConfig: this.awsConfig },
      this.options,
      typeof this.getLogger === 'function' ? this.getLogger() : null
    );
  }

  registerCommands(yargs) {
    yargs.command('lambda', 'manage your lambda deployment', yargs =>
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

  diagnose() {
    const warnings = [];
    const targetNodeVersion =
      !this.config.node || this.config.node === 'current'
        ? process.version
        : this.config.node;

    if (
      semver.gt(
        semver.coerce(targetNodeVersion),
        semver.coerce(MAX_NODE_VERSION)
      )
    ) {
      warnings.push(
        [
          `AWS Lambda only supports Node.js up to version: ${MAX_NODE_VERSION}.`,
          'Please specify or use a Node.js version lower than or equal to this',
          'version in your Hops config (hops.node) to tell Babel for which version',
          'it should transpile for.',
        ].join('\n')
      );
    }

    if (
      !this.awsConfig.domainName &&
      this.awsConfig.basePath.indexOf(this.awsConfig.stageName) !== 0 &&
      trimSlashes(this.config.assetPath).indexOf(this.awsConfig.stageName) !== 0
    ) {
      warnings.push(
        `When no custom domain is configured, the stageName (${
          this.awsConfig.stageName
        }) should be the first path segment in basePath (${
          this.awsConfig.basePath
        }) and assetPath (${this.config.assetPath}).`
      );
    }

    if (this.awsConfig.domainName && !this.awsConfig.certificateArn) {
      warnings.push(
        'Setting a custom domain name also requires to specify the ACM certificate ARN.'
      );
    }
  }
}

LambdaMixin.strategies = {
  deployLambda: callableAsync,
  destroyLambda: callableAsync,
};

module.exports = LambdaMixin;
