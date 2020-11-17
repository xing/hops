/* eslint-disable no-console */

const pino = require('pino');
const escapeRegExp = require('escape-string-regexp');

const logLevels = { error: 0, warn: 1, info: 2, verbose: 3 };

class Logger {
  constructor({ name, _workspace }) {
    this.level = logLevels.info;
    this.logger = pino({
      hooks: {
        logMethod(args, method) {
          if (args.length === 2) {
            args[0] = `${args[0]} %j`;
          }
          method.apply(this, args);
        },
      },
      name,
    });
    this.getCleanMessage = (error) =>
      String(error.stack || error).replace(
        new RegExp(escapeRegExp(_workspace), 'g'),
        '.'
      );
  }

  setLogLevel(level) {
    switch (level) {
      case logLevels.error:
        this.logger.level = 'error';
        break;
      case logLevels.warn:
        this.logger.level = 'warn';
        break;
      case logLevels.info:
        this.logger.level = 'info';
        break;
      case logLevels.verbose:
        this.logger.level = 'debug';
        break;
      default:
        throw new Error(`Unknown log level ${level}.`);
    }
  }

  getTransport() {
    return this.logger;
  }

  error(error, ...args) {
    const message = this.getCleanMessage(error);
    this.logger.error(message, ...args);
  }

  warn(warning, ...args) {
    const message = this.getCleanMessage(warning);
    this.logger.warn(message, ...args);
  }

  info(message, ...args) {
    this.logger.info(message, ...args);
  }

  _(_type, message, ...args) {
    this.logger.debug(message, ...args);
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
