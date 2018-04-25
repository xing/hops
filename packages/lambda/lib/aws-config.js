'use strict';

var path = require('path');
var hopsConfig = require('hops-config');
var semver = require('semver');

var DEFAULT_REGION = 'us-east-1';
var DEFAULT_MEMORY_SIZE = 128;
var DEFAULT_STAGE_NAME = 'prod';
var DEFAULT_CF_TEMPLATE = path.resolve(__dirname, '..', 'cloudformation.yaml');
var DEFAULT_INCLUDE = [hopsConfig.cacheDir + '/**'];
var DEFAULT_EXCLUDE = ['flow-typed/**', 'typings/**'];
var MAX_NODE_VERSION = '8.10';

module.exports = function getAWSConfig() {
  var awsConfig = hopsConfig._aws || hopsConfig.aws || {};
  var manifest = require(path.join(hopsConfig.appDir, 'package.json'));

  var region =
    awsConfig.region ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION;

  var name = 'hops-lambda-' + manifest.name;

  var config = {
    region: region || DEFAULT_REGION,
    stackName: awsConfig.uniqueName || name,
    bucketName: awsConfig.uniqueName || name,
    memorySize: awsConfig.memorySize || DEFAULT_MEMORY_SIZE,
    stageName: awsConfig.stageName || DEFAULT_STAGE_NAME,
    domainName: awsConfig.domainName || '',
    certificateArn: awsConfig.certificateArn || '',
    basePath: hopsConfig.basePath.slice(1) || '(none)',
    cloudformationTemplateFile:
      awsConfig.cloudformationTemplateFile || DEFAULT_CF_TEMPLATE,
    include: awsConfig.include || DEFAULT_INCLUDE,
    exclude: awsConfig.exclude || DEFAULT_EXCLUDE,
  };

  if (!region) {
    console.warn(
      'No AWS region is configured, defaulting to "' + DEFAULT_REGION + '".'
    );
  }

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
    hopsConfig.assetPath.indexOf(config.stageName) !== 0
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
