const { EOL } = require('os');
const stripAnsi = require('strip-ansi');

function serializeError(error, _type) {
  return {
    _type,
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
}

exports.serializeError = serializeError;

function deserializeError(data) {
  if (!data || typeof data !== 'object') {
    return new Error(String(error));
  }

  const { _type, ...error } = data;

  switch (_type) {
    case 'BuildError':
      return new BuildError(error);
    case 'CompilerError':
      return new CompilerError(error);
    default:
      return Object.assign(new Error(error.message), error);
  }
}

exports.deserializeError = deserializeError;

class BuildError extends Error {
  constructor(stack) {
    super();
    this.name = this.constructor.name;
    this.stack = `${this.name}: ${stripAnsi(stack)}`;
    this.message = this.stack.slice(0, this.stack.indexOf(EOL));
  }

  toJSON() {
    return serializeError(this, 'BuildError');
  }
}

exports.BuildError = BuildError;

class CompilerError extends Error {
  constructor(error) {
    const isObject = error && typeof error === 'object';
    const message = isObject ? error.message : String(error);

    super(message);

    if (isObject) {
      Object.assign(this, error);
    }
  }

  toJSON() {
    return serializeError(this, 'CompilerError');
  }
}

exports.CompilerError = CompilerError;

class CoreJsResolutionError extends Error {
  constructor(pkg) {
    super();
    this.name = this.constructor.name;
    this.pkg = pkg;
    this.stack = '';
    this.message = `There is an incompatible version of core-js

The dependency "${this.pkg}" relies on an (outdated) version of core-js,
which breaks the build of Hops. There are four ways to fix this situation:

1.) Tell the author of the package to not consume core-js in their package,
    but leave the act of polyfilling to the application, that consumes their
    package. In this case Hops.

2.) If possible, open a PR at the package's repository and remove the
    problematic usages of core-js yourself. Beware though, that not every
    open-source project is well maintained & sometimes PRs never get merged.

3.) If it's not possible — for whatever reason — to contribute back to the
    package's project, use patch-package (https://npm.im/patch-package) to
    apply your fix to this package locally via a "postinstall"-hook.

4.) If the author of the package won't remove the usages of core-js and
    removing them yourself is not an option for you, you'll have to find
    an alternative package, that provides a similar functionality, while
    playing by the rules of polyfilling.
`;
  }
}

exports.CoreJsResolutionError = CoreJsResolutionError;
