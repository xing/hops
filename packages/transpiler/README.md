# Hops Transpiler

![deprecated](https://img.shields.io/badge/status-deprecated-red.svg)

**This package is deprecated. Please use [hops-middleware](https://www.npmjs.com/package/hops-middleware) instead.**

[![npm](https://img.shields.io/npm/v/hops-transpiler.svg)](https://www.npmjs.com/package/hops-transpiler)

Hops transpiler is a very simple wrapper around Webpack's compiler and it is its most bare-bones, lowest-level component. It exports a function creating an event emitter that is set up to emit three kinds of events: `start`, `success` and `error`.

The `start` event is emitted whenever a transpilation run is started. If the transpiler is created with `watchOptions`, the start event will be emitted whenever a recompilation occurs.

The `success` event is emitted whenever a compilation finishes successfully. It comes with the transpilation result (as a plain node module) and the Webpack stats object.

The `error` event is emitted whenever anything goes haywire during transpilation and import. The transpiler takes care of Webpack's idiosyncrasies with regards to error handling and is extremely strict - even warnings are emitted as errors.

You can override hops' default Webpack configuration by passing a `webpackConfig` object to the `transpile` function. You can also enable watch mode by passing a `watchOptions` object.

### Target Audience

If you want to use dynamically transpiled ECMAScript Next code (i.e. no Express middleware) in your Node.js code, you'll probably want to use it. Just make sure you export something from your module - whatever it is, the transpiler will emit it with its `success` event.

### Example

This example shows how to create a generic ECMAScript Next module and use it in your code.

##### `package.json`

```javascript
{
  ...
  "server": "src/server.js",
  "main": "index.js",
  "dependencies": {
    "hops-build-config": "*",
    "hops-transpiler": "*"
  }
  ...
}
```

##### `src/server.js`

```javascript
export default `hello foo`;
```

##### `index.js`

```javascript
const transpile = require('hops-transpiler');
const webpackConfig = require('hops-build-config').nodeConfig;
const transpilation = transpile(webpackConfig /*, watchOptions */);

transpilation.on('success', function(result) {
  // result === 'hello foo'
});
```

Hops' own [middleware](https://github.com/xing/hops/blob/master/packages/middleware/index.js) probably is the best example of the transpiler in action.
