/* eslint-disable no-console */

const { format } = require('util');
const chalk = require('chalk');
const escapeRegExp = require('escape-string-regexp');
const { appendFile, accessSync, constants } = require('fs');
const { join } = require('path');

const colorize = (string, color) => {
  return chalk.level > 0 ? chalk[color](string) : `[${string}]`;
};

const noop = () => {};

const logLevels = { error: 0, warn: 1, info: 2, verbose: 3 };

class Logger {
  constructor({ name, _workspace }) {
    this.name = name;
    this.level = logLevels.info;

    this.logLocation = process.env.HOPS_LOG_LOCATION;
    if (this.logLocation && !accessSync(this.logLocation, constants.W_OK)) {
      this.logLocation = '';
    }

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
      const formatted = `${prefix} ${format(message, ...args)}`;
      console.error(formatted);
      if (this.logLocation) {
        appendFile(
          join(this.logLocation, 'hops-log.txt'),
          `${new Date().toISOString()} ${formatted}\n`,
          noop
        );
      }
    }
  }

  warn(warning, ...args) {
    const { level, name, getCleanMessage } = this;
    const prefix = colorize(`${name}:warning`, 'yellow');
    const message = getCleanMessage(warning);
    if (level >= logLevels.warn) {
      const formatted = `${prefix} ${format(message, ...args)}`;
      console.warn(formatted);
      if (this.logLocation) {
        appendFile(
          join(this.logLocation, 'hops-log.txt'),
          `${new Date().toISOString()} ${formatted}\n`,
          noop
        );
      }
    }
  }

  info(message, ...args) {
    const { level, name } = this;
    const prefix = colorize(`${name}:info`, 'gray');
    if (level >= logLevels.info) {
      const formatted = `${prefix} ${format(message, ...args)}`;
      console.log(formatted);
      if (this.logLocation) {
        appendFile(
          join(this.logLocation, 'hops-log.txt'),
          `${new Date().toISOString()} ${formatted}\n`,
          noop
        );
      }
    }
  }

  _(type, message, ...args) {
    const { level, name } = this;
    const prefix = colorize(`${name}:${type}`, 'gray');
    if (level >= logLevels.verbose) {
      const formatted = `${prefix} ${format(message, ...args)}`;
      console.log(formatted);
      if (this.logLocation) {
        appendFile(
          join(this.logLocation, 'hops-log.txt'),
          `${new Date().toISOString()} ${formatted}\n`,
          noop
        );
      }
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
