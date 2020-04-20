'use strict';

const defaultHandler = (messages, logger) => {
  messages.forEach((message) => logger.warn(message));
};

module.exports = class GenericValidationMixin {
  constructor() {
    this.messagesMap = new Map();
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
  logResults(logger) {
    const { messagesMap } = this;
    messagesMap.forEach((messages, handler) => handler(messages, logger));
  }
};
