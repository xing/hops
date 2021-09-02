const isPlainObject = require('is-plain-obj');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');
const { sync, async } = require('mixinable');

const { validate, invariant } = bootstrap;
const { sequence, override } = sync;
const { parallel } = async;

const sequenceWithReturn = (functions, arg, ...args) => {
  sequence(functions, arg, ...args);
  return arg;
};

const overrideHandleError = (functions, error, recoverable) => {
  override(functions, error, recoverable);

  if (recoverable !== true) {
    process.exit(1);
  }
};

class YargsMixin extends Mixin {
  handleError(error) {
    if (typeof this.getLogger === 'function') {
      // eslint-disable-next-line no-console
      this.getLogger().error(error.stack || error);
    } else {
      console.error(error.stack || error);
    }
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
