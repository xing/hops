'use strict';

const isPlainObject = require('is-plain-obj');

const {
  sync: { sequence, override },
  async: { parallel },
} = require('mixinable');

const {
  Mixin,
  internal: { validate, invariant },
} = require('@untool/core');

const sequenceWithReturn = (functions, arg, ...args) => {
  sequence(functions, arg, ...args);
  return arg;
};

const overrideHandleError = (functions, error, recoverable) => {
  override(functions, error, recoverable);
  if (!recoverable) process.exit(1);
};

class YargsMixin extends Mixin {
  handleError(error) {
    // eslint-disable-next-line no-console
    console.error(error.stack || error);
  }
}

YargsMixin.strategies = {
  bootstrap: validate(parallel, ({ length }) => {
    invariant(length === 0, 'bootstrap(): Received unexpected argument(s)');
  }),
  registerCommands: validate(sequence, ([yargs]) => {
    invariant(
      yargs && typeof yargs.command === 'function',
      'registerCommands(): Received invalid yargs instance'
    );
  }),
  configureCommand: validate(sequenceWithReturn, ([definition]) => {
    invariant(
      isPlainObject(definition) && definition.command && definition.builder,
      'configureCommand(): Received invalid command definition'
    );
  }),
  handleArguments: validate(sequence, ([args]) => {
    invariant(
      isPlainObject(args),
      'handleArguments(): Received invalid arguments object'
    );
  }),
  handleError: overrideHandleError,
};

module.exports = YargsMixin;
