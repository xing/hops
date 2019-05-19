'use strict';

const { trimSlashes } = require('pathifist');

module.exports = function getAWSConfig(hopsConfig) {
  const awsConfig = hopsConfig._aws || hopsConfig.aws || {};

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
    domainName: awsConfig.domainName || '',
    certificateArn: awsConfig.certificateArn || '',
    basePath: trimSlashes(hopsConfig.basePath) || '(none)',
    cloudformationTemplateFile: awsConfig.cloudformationTemplateFile,
    include: [...(awsConfig.include || [])],
    exclude: [...(awsConfig.exclude || [])],
    ...(awsConfig.profile ? { profile: awsConfig.profile } : null),
  };

  return config;
};
