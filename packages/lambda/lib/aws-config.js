'use strict';

const semver = require('semver');
const {
  stripLeadingSlash,
  stripTrailingSlash,
} = require('@untool/express').uri;

const trimSlashes = input => stripLeadingSlash(stripTrailingSlash(input));

const MAX_NODE_VERSION = '8.10';

module.exports = function getAWSConfig(hopsConfig) {
  const awsConfig = hopsConfig._aws || hopsConfig.aws;

  const region =
    awsConfig.region ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION;

  const config = {
    region,
    stackName: awsConfig.uniqueName,
    bucketName: awsConfig.uniqueName,
    memorySize: awsConfig.memorySize,
    stageName: awsConfig.stageName,
    domainName: awsConfig.domainName,
    certificateArn: awsConfig.certificateArn,
    basePath: trimSlashes(hopsConfig.basePath) || '(none)',
    cloudformationTemplateFile: awsConfig.cloudformationTemplateFile,
    include: awsConfig.include,
    exclude: awsConfig.exclude,
  };

  if (
    semver.gt(semver.coerce(hopsConfig.node), semver.coerce(MAX_NODE_VERSION))
  ) {
    console.warn(
      'AWS Lambda only supports Node.js up to version: ' +
        MAX_NODE_VERSION +
        '. Please specify a version lower than this as node target in your ' +
        'hopsConfig.node, to enable Babel to transpile to the correct version.'
    );
  }

  if (
    !config.domainName &&
    config.basePath.indexOf(config.stageName) !== 0 &&
    trimSlashes(hopsConfig.assetPath).indexOf(config.stageName) !== 0
  ) {
    console.warn(
      'When no custom domain is configured, the stageName (' +
        config.stageName +
        ') should be the first path segment in basePath (' +
        config.basePath +
        ') and assetPath (' +
        hopsConfig.assetPath +
        ').'
    );
  }

  if (config.domainName && !config.certificateArn) {
    console.error(
      'Setting a custom domain name also requires to specify the ACM',
      'certificate ARN.'
    );
    process.exit(1);
  }

  return config;
};
