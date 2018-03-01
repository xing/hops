'use strict';

var serverlessHttp = require('serverless-http');
var app = require('hops-express').createApp({});
var hopsConfig = require('hops-config');

var awsConfig = require('./lib/aws-config')();

var shouldIncludeStageInRequest =
  awsConfig.basePath.indexOf(awsConfig.stageName) === 0 &&
  hopsConfig.assetPath.indexOf(awsConfig.stageName) === 0;

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by serverless-http and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy.
var binaryMimeTypes = [
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
  request: function(request, context) {
    if (shouldIncludeStageInRequest) {
      request.url = context.requestContext.path;
    }
    return request;
  },
});
