'use strict';

const { trimSlashes } = require('pathifist');
const semver = require('semver');

const getRuntimeNodeVersion = (nodeVersion) => {
  const { major } = semver.coerce(nodeVersion);

  switch (major) {
    case 10:
      return 'nodejs10.x';
    case 12:
      return 'nodejs12.x';
    default:
      throw new Error(`Node version ${nodeVersion} is not supported.`);
  }
};

module.exports = function getAWSConfig(hopsConfig) {
  const awsConfig = hopsConfig._aws || hopsConfig.aws || {};
  const nodeVersion =
    hopsConfig.node === 'current' ? process.version : hopsConfig.node;

  const region =
    awsConfig.region ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION;

  const config = {
    region,
    stackName: awsConfig.uniqueName,
    bucketName: awsConfig.uniqueName,
    runtime: getRuntimeNodeVersion(nodeVersion),
    memorySize: awsConfig.memorySize,
    stageName: awsConfig.stageName,
    domainName: awsConfig.domainName || '',
    certificateArn: awsConfig.certificateArn || '',
    basePath: trimSlashes(hopsConfig.basePath) || '(none)',
    cloudformationTemplateFile: awsConfig.cloudformationTemplateFile,
    include: [...(awsConfig.include || [])],
    exclude: [...(awsConfig.exclude || [])],
  };

  return config;
};
