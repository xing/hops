'use strict';

var path = require('path');
var hopsConfig = require('hops-config');

var DEFAULT_REGION = 'us-east-1';
var DEFAULT_MEMORY_SIZE = 128;
var DEFAULT_STAGE_NAME = 'prod';
var DEFAULT_CF_TEMPLATE = path.resolve(
  __dirname,
  '..',
  'cloudformation.yaml'
);

module.exports = function getAWSConfig () {
  var awsConfig = hopsConfig.aws || {};
  var manifest = require(path.join(hopsConfig.appDir, 'package.json'));

  var region = awsConfig.region || process.env.AWS_REGION ||
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
    cloudformationTemplateFile: awsConfig.cloudformationTemplateFile ||
      DEFAULT_CF_TEMPLATE
  };

  if (!region) {
    console.warn(
      'No AWS region is configured, defaulting to "' + DEFAULT_REGION + '".'
    );
  }

  if (!config.domainName && config.stageName !== config.basePath) {
    console.error(
      'When no custom domain is configured, the basePath (' + config.basePath +
      '), assetPath (' + hopsConfig.assetPath + ') and stageName (' +
      config.stageName + ') must have the same value.'
    );
    process.exit(1);
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
