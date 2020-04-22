const { EOL } = require('os');
const stripAnsi = require('strip-ansi');
const { serializeError } = require('serialize-error');

class BuildError extends Error {
  constructor(stack) {
    super();
    this.name = this.constructor.name;
    this.stack = `${this.name}: ${stripAnsi(stack)}`;
    this.message = this.stack.slice(0, this.stack.indexOf(EOL));
  }

  toJSON() {
    return this.stack;
  }
}

exports.BuildError = BuildError;

class CompilerError extends Error {
  constructor(error) {
    super();

    if (error && typeof error === 'object' && error.name && error.message) {
      Object.assign(this, error);
    } else {
      this.message = error;
    }
  }

  toJSON() {
    return serializeError(this);
  }
}

exports.CompilerError = CompilerError;
