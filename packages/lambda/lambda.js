'use strict';

process.env.NODE_ENV = 'production';

const serverlessHttp = require('serverless-http');
const config = require('hops-config');
const { trimSlashes } = require('pathifist');

const app = require('hops-express').configure(config).createServer('serve');

const awsConfig = require('./lib/aws-config')(config);

const shouldIncludeStageInRequest =
  trimSlashes(config.basePath).indexOf(awsConfig.stageName) === 0 &&
  trimSlashes(config.assetPath).indexOf(awsConfig.stageName) === 0;

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by serverless-http and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy.
const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'font/woff',
  'font/woff2',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/x-icon',
  'image/webp',
  'text/comma-separated-values',
  'text/css',
  'text/csv',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

exports.handler = serverlessHttp(app, {
  binary: binaryMimeTypes,
  request: function (request, context) {
    console.log(
      'INCOMING REQUEST',
      JSON.stringify(
        {
          request: { url: request.url },
          context: {
            resource: context.resource,
            path: context.path,
            requestContext: {
              path: context.requestContext.path,
              stage: context.requestContext.stage,
            },
          },
          shouldIncludeStageInRequest: shouldIncludeStageInRequest,
          awsConfig: {
            stageName: awsConfig.stageName,
            domainName: awsConfig.domainName,
            basePath: awsConfig.basePath,
          },
          hopsConfig: {
            basePath: config.basePath,
            assetPath: config.assetPath,
          },
        },
        null,
        2
      )
    );
    if (shouldIncludeStageInRequest) {
      request.url = context.requestContext.path;
    }
    return request;
  },
});
