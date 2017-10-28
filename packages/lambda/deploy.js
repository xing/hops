'use strict';

var fs = require('fs');
var path = require('path');
var AWS = require('aws-sdk');
var hopsConfig = require('hops-config');
var getAWSConfig = require('./lib/aws-config');
var createLambdaBundle = require('./lib/create-lambda-bundle');
var progressWriter = require('./lib/progress-writer');
var fsUtils = require('./lib/fs-utils');

function createBucketIfNotExists (s3, bucketName) {
  return s3.getBucketLocation({ Bucket: bucketName }).promise()
    .then(function () { return bucketName; })
    .catch(function () {
      return s3.createBucket({ Bucket: bucketName }).promise()
        .then(function () {
          return bucketName;
        });
    });
}

function uploadFile (s3, bucketName, file) {
  var progress = progressWriter('uploading ' + path.basename(file));
  return fsUtils.hashFileContents(file).then(function (hash) {
    var parsedPath = path.parse(file);
    return s3.upload({
      Bucket: bucketName,
      Key: path.format({
        name: parsedPath.name + '-' + hash,
        ext: parsedPath.ext
      }),
      Body: fs.createReadStream(file)
    }).promise().then(function (result) {
      progress(1, 1);
      return result;
    });
  });
}

function waitForChangeSetComplete (cloudformation, stackName, changeSetName) {
  return new Promise(function (resolve, reject) {
    function poll () {
      cloudformation.describeChangeSet({
        ChangeSetName: changeSetName,
        StackName: stackName
      }).promise().then(function (result) {
        console.log('changeset status:', result.Status);
        if (result.Status === 'CREATE_COMPLETE') {
          return resolve();
        } else if (result.Status === 'FAILED') {
          return reject(result);
        }
        setTimeout(poll, 2500);
      });
    }
    poll();
  });
}

function getStackOutput (cloudformation, stackName) {
  return new Promise(function (resolve, reject) {
    function poll () {
      cloudformation.describeStacks({
        StackName: stackName
      }).promise().then(function (result) {
        var stack = result.Stacks[0];
        console.log('stack status:', result.Stacks[0].StackStatus);
        if (
          stack.StackStatus === 'CREATE_FAILED' ||
          stack.StackStatus === 'ROLLBACK_FAILED' ||
          stack.StackStatus === 'UPDATE_ROLLBACK_FAILED'
        ) {
          return reject(stack);
        } else if (
          stack.StackStatus === 'CREATE_COMPLETE' ||
          stack.StackStatus === 'UPDATE_COMPLETE' ||
          stack.StackStatus === 'ROLLBACK_COMPLETE' ||
          stack.StackStatus === 'UPDATE_ROLLBACK_COMPLETE'
        ) {
          return resolve(stack);
        }
        setTimeout(poll, 5000);
      });
    }
    poll();
  });
}

function createOrUpdateStack (cloudformation, stackName, templateUrl, params) {
  return cloudformation.describeStacks({ StackName: stackName }).promise()
    .then(function () { return 'UPDATE'; })
    .catch(function () { return 'CREATE'; })
    .then(function (changeSetType) {
      var changeSetName = stackName + '-changeset' + Date.now();

      return cloudformation.createChangeSet({
        ChangeSetName: changeSetName,
        ChangeSetType: changeSetType,
        StackName: stackName,
        TemplateURL: templateUrl,
        Capabilities: ['CAPABILITY_IAM'],
        Parameters: params
      }).promise().then(function () {
        return waitForChangeSetComplete(
          cloudformation,
          stackName,
          changeSetName
        );
      }).then(function () {
        return cloudformation.executeChangeSet({
          ChangeSetName: changeSetName,
          StackName: stackName
        }).promise();
      }).then(function () {
        return getStackOutput(cloudformation, stackName);
      }).then(function (stack) {
        return stack.Outputs[0].OutputValue;
      });
    });
}

module.exports = function deploy (options) {
  var awsConfig = getAWSConfig();

  if (!awsConfig) {
    console.error(
      'No AWS config found in hops config. Please make sure to set up your ' +
        'AWS config in the config.hops.aws section of your package.json.'
    );
    return process.exit(1);
  }

  if (
    !fs.existsSync(hopsConfig.buildDir) ||
    !fs.existsSync(hopsConfig.cacheDir)
  ) {
    console.error(
      'Could not find build or cache directory. Please make sure that you ' +
        'have executed "hops build" before trying to deploy your application.'
    );
    return process.exit(1);
  }

  AWS.config.update({ region: awsConfig.region });

  AWS.config.apiVersions = {
    cloudformation: '2010-05-15',
    s3: '2006-03-01'
  };

  var s3 = new AWS.S3(awsConfig.credentials);
  var cloudformation = new AWS.CloudFormation(awsConfig.credentials);

  return fsUtils.createTmpDirectory().then(function (tmpDirectory) {
    var projectDirectory = hopsConfig.appDir;
    var zippedBundleLocation = path.join(tmpDirectory, 'lambda.zip');

    var progress = progressWriter('zipping');
    function onProgress (event) {
      progress(event.fs.processedBytes, event.fs.totalBytes);
    }

    return Promise.all([
      createLambdaBundle(
        projectDirectory,
        zippedBundleLocation,
        [hopsConfig.buildDir, hopsConfig.cacheDir],
        null,
        onProgress
      ),
      createBucketIfNotExists(s3, awsConfig.bucketName)
    ])
      .then(function () {
        return Promise.all([
          uploadFile(s3, awsConfig.bucketName, zippedBundleLocation),
          uploadFile(
            s3,
            awsConfig.bucketName,
            path.join(__dirname, 'cloudformation.yaml')
          )
        ]);
      })
      .then(function (values) {
        var parameters = [{
          ParameterKey: 'LambdaMemorySize',
          ParameterValue: String(awsConfig.memorySize)
        }, {
          ParameterKey: 'StageName',
          ParameterValue: awsConfig.stageName
        }, {
          ParameterKey: 'BucketName',
          ParameterValue: values[0].Bucket
        }, {
          ParameterKey: 'BundleName',
          ParameterValue: values[0].Key
        }];

        return createOrUpdateStack(
          cloudformation,
          awsConfig.stackName,
          values[1].Location,
          parameters
        );
      });
  }).then(function (url) {
    console.log('Your application has been deployed!');
    console.log('Visit', url, 'in your browser.');

    return {
      url: url
    };
  }).catch(function (error) {
    console.error(error);
    process.exit(1);
  });
};
