'use strict';

var path = require('path');
var hopsConfig = require('hops-config');

var DEFAULT_REGION = 'us-east-1';

module.exports = function getAWSConfig () {
  var awsConfig = hopsConfig.aws;
  var manifest = require(path.join(hopsConfig.appDir, 'package.json'));

  var region = awsConfig.region || process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION;

  var name = 'hops-lambda-' + manifest.name;

  if (!region) {
    console.warn('No AWS region is configured, defaulting to "us-east-1".');
  }

  return awsConfig ? {
    region: region || DEFAULT_REGION,
    stackName: awsConfig.uniqueName ? awsConfig.uniqueName : name,
    bucketName: awsConfig.uniqueName ? awsConfig.uniqueName : name,
    credentials: awsConfig.accessKeyId ? {
      accessKeyId: awsConfig.accessKeyId || null,
      secretAccessKey: awsConfig.secretAccessKey || null,
      sessionToken: awsConfig.sessionToken || null
    } : {}
  } : null;
};
