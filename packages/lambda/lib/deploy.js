'use strict';

var fs = require('fs');
var path = require('path');
var AWS = require('aws-sdk');
var createLambdaBundle = require('./create-lambda-bundle');
var progressWriter = require('./progress-writer');
var fsUtils = require('./fs-utils');

function formatParameters(params) {
  return Object.keys(params).map(function(key) {
    return {
      ParameterKey: key,
      ParameterValue: String(params[key]),
    };
  });
}

function createBucketIfNotExists(s3, bucketName) {
  return s3
    .headBucket({ Bucket: bucketName })
    .promise()
    .catch(function() {
      return s3
        .createBucket({ Bucket: bucketName })
        .promise()
        .then(function() {
          return s3.waitFor('bucketExists', { Bucket: bucketName }).promise();
        });
    });
}

function uploadFile(s3, bucketName, file, logger) {
  var progress = progressWriter('uploading ' + path.basename(file), logger);
  return fsUtils.hashFileContents(file).then(function(hash) {
    var parsedPath = path.parse(file);
    return s3
      .upload({
        Bucket: bucketName,
        Key: path.format({
          name: parsedPath.name + '-' + hash,
          ext: parsedPath.ext,
        }),
        Body: fs.createReadStream(file),
      })
      .promise()
      .then(function(result) {
        progress(1, 1);
        return result;
      });
  });
}

function getStackOutput(cloudformation, stackName, logger) {
  return new Promise(function(resolve, reject) {
    function poll() {
      cloudformation
        .describeStacks({
          StackName: stackName,
        })
        .promise()
        .then(function(result) {
          var stack = result.Stacks[0];
          if (logger) {
            logger.info(`stack status: ${result.Stacks[0].StackStatus}`);
          }
          if (
            stack.StackStatus === 'CREATE_FAILED' ||
            stack.StackStatus === 'ROLLBACK_FAILED' ||
            stack.StackStatus === 'UPDATE_ROLLBACK_FAILED' ||
            stack.StackStatus === 'ROLLBACK_COMPLETE' ||
            stack.StackStatus === 'UPDATE_ROLLBACK_COMPLETE'
          ) {
            return reject(stack);
          } else if (
            stack.StackStatus === 'CREATE_COMPLETE' ||
            stack.StackStatus === 'UPDATE_COMPLETE'
          ) {
            return resolve(stack);
          }
          setTimeout(poll, 5000);
        });
    }
    poll();
  });
}

function createOrUpdateStack(
  cloudformation,
  stackName,
  templateUrl,
  params,
  logger
) {
  return cloudformation
    .describeStacks({ StackName: stackName })
    .promise()
    .then(function() {
      return 'UPDATE';
    })
    .catch(function() {
      return 'CREATE';
    })
    .then(function(changeSetType) {
      var changeSetName = stackName + '-changeset' + Date.now();

      return cloudformation
        .createChangeSet({
          ChangeSetName: changeSetName,
          ChangeSetType: changeSetType,
          StackName: stackName,
          TemplateURL: templateUrl,
          Capabilities: ['CAPABILITY_IAM'],
          Parameters: params,
        })
        .promise()
        .then(function() {
          if (logger) {
            logger.info('Creating stack change set');
          }
          return cloudformation
            .waitFor('changeSetCreateComplete', {
              StackName: stackName,
              ChangeSetName: changeSetName,
              $waiter: {
                delay: 5,
              },
            })
            .promise();
        })
        .then(function() {
          if (logger) {
            logger.info('Executing stack change set');
          }
          return cloudformation
            .executeChangeSet({
              ChangeSetName: changeSetName,
              StackName: stackName,
            })
            .promise();
        })
        .then(function() {
          return getStackOutput(cloudformation, stackName, logger);
        })
        .then(function(stack) {
          return stack.Outputs.reduce(function(result, output) {
            result[output.OutputKey] = output.OutputValue;
            return result;
          }, {});
        });
    });
}

module.exports = function deploy(
  { hopsConfig, awsConfig },
  options,
  parametersOverrides,
  logger
) {
  if (!fs.existsSync(hopsConfig.buildDir)) {
    if (logger) {
      logger.error(
        'Could not find build directory. Please make sure that you ' +
          'have executed "hops build" before trying to deploy your application.'
      );
    }
    return process.exit(1);
  }

  AWS.config.update({ region: awsConfig.region });

  AWS.config.apiVersions = {
    cloudformation: '2010-05-15',
    s3: '2006-03-01',
  };

  var s3 = new AWS.S3();
  var cloudformation = new AWS.CloudFormation();

  return fsUtils
    .createTmpDirectory()
    .then(function(tmpDirectory) {
      var zippedBundleLocation = path.join(tmpDirectory, 'lambda.zip');

      var progress = progressWriter('zipping');
      function onProgress(event) {
        progress(event.fs.processedBytes, event.fs.totalBytes);
      }

      return Promise.all([
        createLambdaBundle(
          hopsConfig.rootDir,
          zippedBundleLocation,
          awsConfig.include,
          awsConfig.exclude,
          onProgress
        ),
        createBucketIfNotExists(s3, awsConfig.bucketName),
      ])
        .then(function() {
          return Promise.all([
            uploadFile(s3, awsConfig.bucketName, zippedBundleLocation, logger),
            uploadFile(
              s3,
              awsConfig.bucketName,
              awsConfig.cloudformationTemplateFile,
              logger
            ),
          ]);
        })
        .then(function(values) {
          var parameters = formatParameters(
            Object.assign(
              {
                LambdaMemorySize: awsConfig.memorySize,
                StageName: awsConfig.stageName,
                BasePath: awsConfig.basePath,
                BucketName: awsConfig.bucketName,
                BundleName: values[0].Key,
                DomainName: awsConfig.domainName,
                CertificateArn: awsConfig.certificateArn,
              },
              parametersOverrides || {}
            )
          );

          return createOrUpdateStack(
            cloudformation,
            awsConfig.stackName,
            values[1].Location,
            parameters,
            logger
          );
        });
    })
    .then(function(outputs) {
      if (!logger) {
        return outputs;
      }

      logger.info('Your application has been deployed!');

      if (outputs.DistributionDomainName) {
        logger.info(
          `Now you need to set your domain's A-Record or CNAME-Record to: ${
            outputs.DistributionDomainName
          }`
        );
      } else {
        logger.info(`Visit ${outputs.Url} in your browser.`);
      }

      return outputs;
    })
    .catch(function(error) {
      if (error.code) {
        if (logger) {
          logger.error(`AWS: (${error.code}) ${error.message}`);
        }
      } else {
        if (logger) {
          logger.error(error);
        }
      }
      process.exitCode = 1;
    });
};
