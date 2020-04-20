'use strict';
/* eslint-disable no-console */

const { format } = require('util');

const chalk = require('chalk');
const escapeRegExp = require('escape-string-regexp');

const colorize = (string, color) => {
  return chalk.level > 0 ? chalk[color](string) : `[${string}]`;
};

const logLevels = { error: 0, warn: 1, info: 2, verbose: 3 };

class Logger {
  constructor({ name, _workspace }) {
    this.name = name;
    this.level = logLevels.info;
    this.getCleanMessage = (error) =>
      String(error.stack || error).replace(
        new RegExp(escapeRegExp(_workspace), 'g'),
        '.'
      );
  }
  setLogLevel(level) {
    this.level = level;
  }
  error(error, ...args) {
    const { level, name, getCleanMessage } = this;
    const prefix = colorize(`${name}:error`, 'red');
    const message = getCleanMessage(error);
    if (level >= logLevels.error) {
      console.error(`${prefix} ${format(message, ...args)}`);
    }
  }
  warn(warning, ...args) {
    const { level, name, getCleanMessage } = this;
    const prefix = colorize(`${name}:warning`, 'yellow');
    const message = getCleanMessage(warning);
    if (level >= logLevels.warn) {
      console.warn(`${prefix} ${format(message, ...args)}`);
    }
  }
  info(message, ...args) {
    const { level, name } = this;
    const prefix = colorize(`${name}:info`, 'gray');
    if (level >= logLevels.info) {
      console.log(`${prefix} ${format(message, ...args)}`);
    }
  }
  _(type, message, ...args) {
    const { level, name } = this;
    const prefix = colorize(`${name}:${type}`, 'gray');
    if (level >= logLevels.verbose) {
      console.log(`${prefix} ${format(message, ...args)}`);
    }
  }
}

exports.createLogger = (...args) =>
  new Proxy(new Logger(...args), {
    get(logger, prop) {
      if (typeof prop !== 'string') return logger[prop];
      return prop in logger
        ? typeof logger[prop] === 'function'
          ? logger[prop].bind(logger)
          : logger[prop]
        : logger._.bind(logger, prop);
    },
  });

exports.logLevels = logLevels;
