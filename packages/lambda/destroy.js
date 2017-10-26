'use strict';

var AWS = require('aws-sdk');
var prompt = require('./lib/prompt');
var getAWSConfig = require('./lib/aws-config');

function emptyBucket (s3, bucketName) {
  return s3.listObjectsV2({ Bucket: bucketName }).promise()
    .then(function (data) {
      return data.Contents.map(function (object) {
        return { Key: object.Key };
      });
    })
    .then(function (objects) {
      return s3.deleteObjects({
        Bucket: bucketName,
        Delete: { Objects: objects }
      }).promise();
    });
}

function deleteBucket (s3, bucketName) {
  var params = { Bucket: bucketName };
  return s3.getBucketLocation(params).promise()
    .then(function () {
      return s3.deleteBucket(params).promise();
    });
}

function deleteStack (cloudFormation, stackName) {
  return cloudFormation.deleteStack({
    StackName: stackName
  }).promise();
}

module.exports = function destroy (options) {
  var awsConfig = getAWSConfig();

  if (!awsConfig) {
    console.error(
      'No AWS config found in hops config. Please make sure to set up your ' +
        'AWS config in the config.hops.aws section of your package.json.'
    );
    return process.exit(1);
  }

  AWS.config.update({ region: awsConfig.region });

  AWS.config.apiVersions = {
    cloudformation: '2010-05-15',
    s3: '2006-03-01'
  };

  var s3 = new AWS.S3(awsConfig.credentials);
  var cloudFormation = new AWS.CloudFormation(awsConfig.credentials);

  function main () {
    return deleteStack(cloudFormation, awsConfig.stackName)
      .then(function () {
        if (!options.keepFiles) {
          return emptyBucket(s3, awsConfig.bucketName);
        }
      })
      .then(function () {
        if (!(options.keepFiles || options.keepBucket)) {
          return deleteBucket(s3, awsConfig.bucketName);
        }
      });
  }

  function onError (error) {
    console.error('AWS:', error.code, error.message);
    process.exit(1);
  }

  return options.yes ? main().catch(onError) : prompt(
    'This will delete your Lambda function and all its AWS resources. ' +
      'Are you sure you want to continue?'
  ).then(function (confirmed) {
    return confirmed ? main() : console.log('Aborted.');
  }).catch(onError);
};
