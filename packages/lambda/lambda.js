'use strict';

var awsServerlessExpress = require('aws-serverless-express');
var app = require('hops-express').createApp();

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy.
var binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
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
  'text/xml'
];
var server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.handler = function (event, context) {
  event.path = event.requestContext.path;
  return awsServerlessExpress.proxy(server, event, context);
};
