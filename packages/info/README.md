# `hops-info`

`hops-info` is a mixin providing output for `hops`'s command line interface. Besides that, it allows other mixins to define pre-flight checks that are run during application startup.

### Installation

```bash
$ yarn add hops-info # OR npm install hops-info
```

## CLI

`hops-info` does not define any commands of its own, but only adds some global CLI flags to control console output. Using the flags `-v`/`--verbose` and `-q`/`--quiet` once or multiple times, you can de- and increase the log output. Default log level is `info`, passing a single `-q` will reduce it to `warning` while a single `-v` will bump it to `verbose`. Passing `-qqq` will silence all output completely.

#### Log Levels

```text
{
  error: 0,
  warning: 1,
  info: 2,
  verbose: 3,
}
```

Additionally, you can pass `--color`/`--no-color` flags to manually enable or disable [output colors](https://github.com/chalk/chalk#chalksupportscolor), but you can usually rely on `hops-info` to determine color support automatically.

```bash
$ hops start -v --no-color
```

### Configuration

#### Render Options

This preset has only a single runtime option which can be passed to the `render()` options inside the `webVitals` key (see example above).

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `webVitals.handler` | `ReportHandler` | `undefined` | _no_ | A callback to report web vitals metrics [API](https://www.npmjs.com/package/web-vitals#api) |

##### `handler`

By default this preset adds no report handler for web vitals metrics. You can add your own handler through this option to report the core web vitals to your analytics provider.

Take a look at these resources for implementation details:

- https://web.dev/vitals/
- https://www.npmjs.com/package/web-vitals

```javascript
export default render(<MyApp />, {
  webVitals: { handler: console.log },
});
```

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

### `getLogger()` ([callable](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **core/server**

This utility hook defined by `hops-info` provides other mixins with a fully configured logger instance. This logger has three standard log methods (`info`, `warning` and `error`) that correspond to the lower three log levels described above. Additionally, it supports arbitrary log methods (e.g. `request`, `hint`, `foo`)

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class FooMixin extends Mixin {
  bar() {
    if (typeof this.getLogger === 'function') {
      const logger = this.getLogger();
      logger.info('this will log an info message');
      logger.warning('this will log a warning message');
      logger.error('this will log an error message');
      logger.baz('this will log a verbose message');
      logger.qux('this will log a verbose message, too');
    }
  }
};
```

#### `getWebVitalsHandler(): ReportHandler` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **browser**

Hook to return a custom [ReportHandler](https://www.npmjs.com/package/web-vitals#api).

Beware that `handler` passed as render option takes precedence.

### `diagnose(doctor, mode)` ([parallel](https://github.com/untool/mixinable/blob/master/README.md#defineparallel)) **core**

By implementing this method, your core mixin can perform pre-flight checks during application startup/build and create warnings & errors. If you need to do something asynchronous at this point, just return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

The second argument `mode` lets you create context-sensitive warnings/errors. Its possible values are:

- `'build-serve'`
- `'develop'`
- `'serve'`
- `'build'`
- `'indeterminate'`

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class FooMixin extends Mixin {
  diagnose(doctor, mode) {
    doctor.diagnoseDuplicatePackages('bar');
    const mathIsBroken = 1 + 1 !== 2;
    const message = 'Math is broken.';

    if (mode === 'develop') doctor.pushWarning(message);
    if (mode === 'serve') doctor.pushError('heavy-math', message);
  }
};
```

Additionally, you can use the helper methods defined on our semi-private [doctor](./doctor/index.js) object that is being passed into this hook.
