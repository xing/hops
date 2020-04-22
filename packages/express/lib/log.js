'use strict';

const morgan = require('morgan');
const split = require('split');

const prettyMS = require('pretty-ms');
const prettyBytes = require('pretty-bytes');
const chalk = require('chalk');

morgan.token('pretty-size', (req, res) => {
  const size = res.get('content-length');
  if (!size) return;
  return prettyBytes(Number(size));
});

morgan.token('pretty-status', (req, res) => {
  const headersSent =
    typeof res.headersSent !== 'boolean'
      ? Boolean(res._header)
      : res.headersSent;
  const status = headersSent ? String(res.statusCode) : undefined;
  if (status >= 500) return chalk.red(status);
  if (status >= 400) return chalk.yellow(status);
  return status;
});

morgan.token('pretty-response-time', (req, res) => {
  if (!req._startAt || !res._startAt) return;
  const ms =
    (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6;
  return prettyMS(Number(ms.toFixed()));
});

module.exports = (logger) =>
  morgan(':method :url :pretty-status :pretty-response-time - :pretty-size', {
    stream: split().on('data', (line) => logger.request(line)),
  });
