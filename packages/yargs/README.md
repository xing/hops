# `hops-yargs`

`hops-yargs` is a [core mixin](../boostrap/README.md#mixins) powering `hops`'s command line interface and allowing other mixins to define their own commands. These custom commands will work exactly as those defined by `hops`'s own modules and can be called using executables such as [Hops CLI](../cli/README.md).

### Installation

```bash
$ yarn add hops-yargs # OR npm install hops-yargs
```

## CLI

`hops-yargs` does not define any commands of its own, but only takes care of basically setting up [`yargs`](http://yargs.js.org).

`hops-yargs` provides a basic command line interface you can use to control your application. It is called `hops` - and it is best used inside your `package.json` scripts section.

```json
{
  "scripts": {
    "start": "hops start"
  }
}
```

Alternatively, you can call it directly inside your project using `npx` or `yarn exec`. Call it without any command to see the available commands and options.

```bash
$ yarn exec hops start # OR npx hops start
```

## API

`hops-yargs` only has a couple of semi-private exports, but it exposes a couple of mixin hooks other mixins can implement, allowing them to alter or extend its functionality. These hooks will be called either by `hops-yargs` itself or by others.

### `bootstrap()` ([parallel](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

Within this method, you are expected to set up your application. If you need to do something asynchronous at this point, just return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class FooMixin extends Mixin {
  bootstrap(yargs) {
    return Promise.resolve();
  }
};
```

### `registerCommands(yargs)` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

This is the most relevant hook provided by `hops-yargs`: it enables other mixins to register their respective commands. Implementations of this mixin method will receive a single argument: a [`yargs`](http://yargs.js.org) instance.

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class FooMixin extends Mixin {
  registerCommands(yargs) {
    yargs.command(
      this.configureCommand({
        command: 'foo',
        builder: {},
        handler: (argv) => {},
      })
    );
  }
};
```

### `configureCommand(definition)` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

By implementing this method, your mixin can intercept and alter command configuration. Its main purpose is to enable you to add arguments to commands defined by other mixins.

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class FooBarMixin extends Mixin {
  configureCommand(definition) {
    if (definition.command === 'foo') {
      definition.builder.bar = {
        alias: 'b',
        default: false,
        describe: 'Enable bar',
        type: 'boolean',
      };
    }
  }
};
```

**Caveat**: please be advised that, while we strive to keep the `definition` argument very stable, it may change between `minor` versions of the Hops packages that provide commands. Additionally, other mixins may alter the command you want to modify in relevant ways, so code accordingly.

### `handleArguments(argv)` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

Your mixin's implementation of this method will receive the parsed CLI arguments passed to `hops-yargs`. You may want to implement it if you need to alter mixin behaviour according to these args.

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class FooMixin extends Mixin {
  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
};
```

### `handleError(error, recoverable)` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

By implementing this method, you can handle exceptions occuring in your application - even uncaught errors and unhandled promise rejections. **If `receoverable' is 'false`, `hops-yargs` will automatically terminate the [running process](https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly).**

```javascript
const { Mixin } = require('hops-mixin');
const { logError } = require('./logger');

module.exports = class FooMixin extends Mixin {
  handleError(error, recoverable) {
    logError(error);
  }
};
```
