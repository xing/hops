'use strict';

process.env.UNTOOL_NSP = 'hops';
process.env.NODE_ENV = 'production';

const serverlessHttp = require('serverless-http');
const config = require('@untool/core/lib/env').environmentalize(
  require('@untool/core/lib/config').getConfig({ configNamespace: 'hops' })
);
const {
  stripLeadingSlash,
  stripTrailingSlash,
} = require('@untool/express').uri;
const trimSlashes = input => stripLeadingSlash(stripTrailingSlash(input));
const app = require('@untool/express').createServer('serve');

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
  request: function(request, context) {
    if (shouldIncludeStageInRequest) {
      request.url = context.requestContext.path;
    }
    return request;
  },
});
