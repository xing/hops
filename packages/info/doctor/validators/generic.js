const EnhancedPromise = require('eprom');

const defaultHandler = (messages, logger) => {
  messages.forEach((message) => logger.warn(message));
};

const { HOPS_IGNORE_ERRORS = '' } = process.env;
const errorsIgnoreList = HOPS_IGNORE_ERRORS.split(/\s*,\s*/).filter(Boolean);

const errorIsIgnored = (tag) => errorsIgnoreList.includes(tag);

module.exports = class GenericValidationMixin {
  constructor(_, handleError) {
    this.messagesMap = new Map();
    this.modePromise = new EnhancedPromise();
    this.handleError = (errors) =>
      errors.forEach((err, i, { length }) => {
        const recoverable = i < length - 1;
        handleError(err, recoverable);
      });
  }

  setMode(mode) {
    this.modePromise.resolve(mode);
  }

  getMode() {
    return this.modePromise;
  }

  collectResults(handler, ...messages) {
    const { messagesMap } = this;

    if (typeof handler !== 'function') {
      if (handler) {
        messages.unshift(handler);
      }
      handler = defaultHandler;
    }

    if (messagesMap.has(handler)) {
      messagesMap.get(handler).push(...messages);
    } else {
      messagesMap.set(handler, messages);
    }
  }

  pushWarning(warning) {
    this.collectResults(warning);
  }

  pushError(tag, error) {
    if (!error) {
      throw new Error('Please provide a tag for the error message.');
    }

    if (errorIsIgnored(tag)) {
      this.collectResults(error);
    } else {
      this.collectResults(this.handleError, error);
    }
  }

  logResults(logger) {
    const { messagesMap } = this;
    const entries = [];

    for (const [handler, messages] of messagesMap.entries()) {
      const fn = () => handler(messages, logger);
      if (handler === this.handleError) {
        entries.push(fn);
      } else {
        entries.unshift(fn);
      }
    }

    entries.forEach((fn) => fn());
  }
};
