'use strict';

var AWS = require('aws-sdk');
var prompt = require('./prompt');

function emptyBucket(s3, bucketName, logger) {
  if (logger) {
    logger.info('Deleting objects in S3 bucket');
  }
  return s3
    .headBucket({ Bucket: bucketName })
    .promise()
    .then(function() {
      return s3
        .listObjectsV2({ Bucket: bucketName })
        .promise()
        .then(function(data) {
          return data.Contents.map(function(object) {
            return { Key: object.Key };
          });
        })
        .then(function(objects) {
          return s3
            .deleteObjects({
              Bucket: bucketName,
              Delete: { Objects: objects },
            })
            .promise();
        });
    });
}

function deleteBucket(s3, bucketName, logger) {
  if (logger) {
    logger.info('Deleting S3 bucket');
  }
  var params = { Bucket: bucketName };
  return s3
    .headBucket(params)
    .promise()
    .then(function() {
      return s3.deleteBucket(params).promise();
    });
}

function deleteStack(cloudFormation, stackName, logger) {
  if (logger) {
    logger.info('Deleting CloudFormation stack');
  }
  return cloudFormation
    .deleteStack({
      StackName: stackName,
    })
    .promise()
    .then(function() {
      return cloudFormation.waitFor('stackDeleteComplete', {
        StackName: stackName,
        $waiter: {
          delay: 5,
        },
      });
    });
}

module.exports = function destroy({ awsConfig }, options, logger) {
  AWS.config.update({ region: awsConfig.region });

  AWS.config.apiVersions = {
    cloudformation: '2010-05-15',
    s3: '2006-03-01',
  };

  var s3 = new AWS.S3();
  var cloudFormation = new AWS.CloudFormation();

  function main() {
    return deleteStack(cloudFormation, awsConfig.stackName, logger)
      .then(function() {
        if (!options.keepFiles) {
          return emptyBucket(s3, awsConfig.bucketName, logger);
        }
      })
      .then(function() {
        if (!(options.keepFiles || options.keepBucket)) {
          return deleteBucket(s3, awsConfig.bucketName, logger);
        }
      });
  }

  function onError(error) {
    if (logger) {
      logger.error(`AWS: (${error.code}) ${error.message}`);
    }
    process.exitCode = 1;
  }

  return options.yes
    ? main().catch(onError)
    : prompt(
        'This will delete your Lambda function and all its AWS resources. ' +
          'Are you sure you want to continue?'
      )
        .then(function(confirmed) {
          return confirmed ? main() : logger && logger.info('Aborted.');
        })
        .catch(onError);
};
