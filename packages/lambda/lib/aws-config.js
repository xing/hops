'use strict';

var path = require('path');
var hopsConfig = require('hops-config');

module.exports = function getAWSConfig () {
  var config = hopsConfig.aws;
  var manifest = require(path.join(hopsConfig.appDir, 'package.json'));

  var namePrefix = 'hops-' + manifest.name + '-';

  return config ? {
    region: config.region || process.env.AWS_REGION,
    stackName: namePrefix + config.uniqueName,
    bucketName: namePrefix + config.uniqueName,
    credentials: config.accessKeyId ? {
      accessKeyId: config.accessKeyId || null,
      secretAccessKey: config.secretAccessKey || null,
      sessionToken: config.sessionToken || null
    } : {}
  } : null;
};
