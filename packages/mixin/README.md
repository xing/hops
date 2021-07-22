# `hops-mixin`

[![npm](https://img.shields.io/npm/v/hops-mixin.svg)](https://www.npmjs.com/package/hops-mixin)

**Please see the [main Hops Readme](https://github.com/xing/hops#docs) for general information and a Getting Started Guide.**

Contains the building blocks needed to build your own hops mixins. Mixins allow you to alter and extend Hops' functionality.

Tap into them using your own mixins and [reconfigure Webpack](../styled-components/mixin.core.js#L4), [register additional Express](../development-proxy/mixin.core.js#L11) middlewares and [Yargs commands](../apollo-mock-server/mixin.core.js#L34) or [fetch data to bootstrap your React application](../react/server-data/mixin.server.js#L20).

Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

### Installation

```bash
npm install --save hops-mixin
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### API

#### Mixin

Base class to extend from when building a mixin. Ensures the config is available in `this.config`.

```javascript
const { Mixin } = require('hops-mixin');

class MyMixin extends Mixin {}
```

#### strategies

Strategies allow to define mixin hooks that are usable by other mixins. There are various types of strategies. `callable` will make the method available to other mixins. Methods with strategy `pipe` pass each implementation's output to the next, using the first argument as the initial value. All other arguments are being passed to all implementations as-is.

For a complete list of available strategies, have a look at the [mixinable documentation](https://github.com/untool/mixinable).

##### Callable example

A mixin that exposes a method to retrieve the build config.

```javascript
const {
  Mixin,
  strategies: { sync: callable },
} = require('hops-mixin');

class BuildConfigMixin extends Mixin {
  getBuildConfig() {
    return this.buildConfig;
  }
}

MyMixin.strategies = {
  getBuildConfig: callable,
};
```

Other mixins are now able to call the method.

```javascript
const { Mixin } = require('hops-mixin');

class ConsumerMixin extends Mixin {
  myMethod() {
    const config = this.getBuildConfig();
  }
}
```
