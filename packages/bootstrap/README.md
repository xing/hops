# `hops-bootstrap`

`hops-bootstrap` is the functional foundation every other `hops` component is built upon. It contains a comprehensive configuration engine and takes care of loading mixins and presets.

### Installation

```bash
$ yarn add hops-bootstrap # OR npm install hops-bootstrap
```

## Configuration

Apart from a couple of very basic properties (`name`, `version` and `rootDir`), `hops-bootstrap` does not provide configuration of its own. It does, however, provide an elaborate configuration mechanism.

It allows you to set up mixins and pull in presets. Mixins provide extra functionality. Presets provide configuration defaults and often additionally include custom mixins. Read more about mixins and presets below.

```json
{
  "mixins": ["hops-yargs"],
  "presets": ["hops-express"]
}
```

`hops-bootstrap` comes with support for environment specific configuration. For example, [`hops-express`](../express/README.md) uses this placeholder based mechanism to bind the server port to the value of an environment variable.

```json
{
  "port": "[PORT]"
}
```

Now if you start your app in an environment in which the corresponding variable is defined, it will be picked up _at runtime_. To streamline development workflows, `hops-bootstrap` comes with built-in support for [`dotenv`](https://github.com/motdotla/dotenv).

```bash
$ PORT=12345 hops start
```

Furthermore those placeholders accept fallback values. So — regarding our example — if there's no `PORT`-variable given _at runtime_, `hops-bootstrap` is able to fall back to a value provided via the configuration.

```json
{
  "port": "[PORT=3000]"
}
```

There is another kind of placeholders. It can be used to reference other configuration values. Nested structures will be flattened before being used for placeholder substitution.

```json
{
  "foo": "foo",
  "bar": {
    "baz": "<foo>"
  },
  "qux": "<bar.baz>"
}
```

To prevent sensitive data provided to `hops-bootstrap` from being leaked to the browser in a universal web app, there's a `browserWhitelist`-property on the configuration object. Assuming you have a config like the one in the code block above and you only want to expose the values `"foo"` and `"baz"` to the browser (which would be redundant, but nevermind…), you would have to white-list them like this:

```json
{
  "browserWhitelist": {
    "foo": true,
    "bar.baz": true
  }
}
```

**Note:** Have in mind that you must explicitly whitelist config properties, that hold an environment variable placeholder, otherwise the interpolation fails.

```json
{
  "foo": {
    "bar": "[FOOBAR]"
  },
  "browserWhitelist": {
    "foo.bar": true
  }
}
```

If you instead whitelist the whole nested object, that holds this property, `hops-bootstrap` is currently not able to detect the placeholder.

```json
{
  "foo": {
    "bar": "[FOOBAR]"
  },
  "browserWhitelist": {
    "foo": true
  }
}
```

Besides that, whitelisting of nested objects as a whole is fine. Also this is considered a bug and will be fixed in one of the next minor releases.

`hops-bootstrap` looks for configuration data in a couple of places. It only uses the first config it finds, so make sure you do not have multiple configs lying around:

- an `hops` property in your project's `package.json` file
- an `.hopsrc` file in your project's root folder (JSON, YAML, or JS)
- an `.hopsrc.{json,yaml,yml,js}` file in your project's root folder
- an `hops.config.js` file in your project's root folder

We strongly encourage organizing and publishing reusable bits of configuration as custom presets. You can even use any other `hops` project as a preset: just install it (e.g. `yarn add <git remote url>`) and add it to the `presets` section in your project's `hops` configuration.

### Presets

`hops` presets are JavaScript files or standard NPM modules. Presets can define or override arbitrary configuration properties, including mixins and other presets.

Just as with your own project, presets can be written using JavaScript, JSON or YAML syntax. They are plain nested objects (or hashes) and they fully support the features outlined above: placeholders and environment specificity.

##### JavaScript preset

```javascript
module.exports = {
  foo: 'bar',
  baz: {
    quux: [23],
  },
};
```

##### JSON preset

```json
{
  "foo": "bar",
  "baz": {
    "quux": [23]
  }
}
```

##### YAML preset

```yaml
foo: bar
baz:
  quux:
    - 23
```

In preset packages, `hops-bootstrap` will try to load a config from the same places as in your project and in addition, it will look in two more places:

- a file defined in the `preset` property in the preset's `package.json` file
- a `preset.js` file in the preset package's root folder

If you want to not only override and extend config values, but rather provide actual features, you can include custom mixins directly in your preset. Some of `hops`'s default presets do just that.

#### Ignoring a preset

In rare cases it is necessary to ignore a certain preset, for example if a dependency contains a `preset.js` file but actually is not a preset. For these circumstances we have an escape hatch through the `ignoredPresets` property.

```json
{
  "ignoredPresets": ["@storybook/addon-knobs"]
}
```

Because of how the presets are loaded it is necessary to specify the `ignoredPresets` property directly in the root config (i.e. it cannot be pre-filled with values from other presets). This should only impact you if you are writing a preset yourself.

### Mixins

Mixins are the primary mechanism in `hops` to extend and alter its features and behaviour. Using mixins, you can, for example, add your own Yargs commands, Express middlewares or React add-ons such as Redux.

You can even build custom mixins that provide hooks for others to tap into, extending and altering their capabilities. There are three distinct types of mixins that are supported in `hops`: `core`, `browser` and `server`.

`hops` uses a single config key for all three kinds of mixins: `mixins`. It expects an array of module path strings. `hops-bootstrap` looks for mixins in the following places beneath those module paths:

- a file defined in the `mixin:{core,server,browser}` property in the preset's `package.json` file
- a file defined in the `mixin:runtime` property in the preset's `package.json` file (for `server`+`browser`)
- a file defined in the `mixin` property in the preset's `package.json` file (for `core`+`server`+`browser`)
- a `mixin.{core,server,browser}.js` file in the preset package's root folder
- a `mixin.runtime.js` file in the preset package's root folder (for `server`+`browser`)
- a `mixin.js` file in the preset package's root folder (for `core`+`server`+`browser`)

By using this mechanism, you can use a single NPM module to provide all three types of mixins, one mixin each for build and runtime or even a single mixin used for all contexts.

Every and all functionality in and around `hops` is expected to be organized in mixins. In `hops`, mixins are a bit special: they do not share state, i.e. they do not provide methods to a single 'host' object.

Instead, they are based on a library called [`mixinable`](https://github.com/untool/mixinable). Their methods are, therefore, applied according to specific strategies: `override`, `parallel`, `sequence`, and `pipe` are some examples.

If you create custom mixins that define additional mixin strategies, you probably want to call the appropriate methods yourself to allow others to, for example, modify your mixin's specific config.

## API

### `Mixin(config, options)`

```javascript
import { Mixin } from 'hops-mixin';

class MyMixin extends Mixin {
  myMethod() {}
}

export default MyMixin;
```

`Mixin` is a base class to build custom mixins upon. As such, it only provides a class constructor that accepts and handles a couple of arguments. You do not, however, usually instantiate your mixins - `hops-bootstrap` does that for you if configured to use them.

The `Mixin` constructor expects two arguments: `config`, the main configuration object, and `options`, an object containing more ephemeral settings. These arguments are made available as a homonymous instance properties.

```javascript
import { override } from 'mixinable';
import { Mixin } from 'hops-mixin';

class MyMixin extends Mixin {
  constructor(config, options) {
    super(config, options);
  }
  myMethod(...args) {
    return this.myHookMethod(...args);
  }
}

MyMixin.strategies = {
  myHookMethod: override,
};

export default MyMixin;
```

If inheriting from `Mixin`, all mixinable methods of your mixin are automatically bound to the respective instance, so you do not have to call `method.bind()` yourself even if you use them in asynchronous contexts.

While it is technically possible to define non-mixin utility methods on your mixin, doing so is strongly discouraged. If you have to, however, it is recommended to prefix such methods' names with an underscore (`_`) to denote them as private.

Note that you can call all defined mixinable methods directly on your mixin instance.

### `initialize([configOverrides], [options])`

This is a semi-private function that is mainly being used internally, for example by [`hops-yargs`](../yargs/README.md). It returns the core mixin container - this allows you to call all defined mixin methods.

You will only ever have to call it if you want to use `hops-bootstrap` programmatically. You can pass it an `configOverrides` object that will be merged into the main config object, and an options object mixins might use instead of CLI arguments.
