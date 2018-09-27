# `hops-preset-defaults`

[![npm](https://img.shields.io/npm/v/hops-preset-defaults/next.svg)](https://www.npmjs.com/package/hops-preset-defaults)

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that contains a collection of base presets that are always needed.

It contains:

- [`@untool/yargs`](https://github.com/untool/untool/tree/master/packages/yargs)
- [`@untool/express`](https://github.com/untool/untool/tree/master/packages/express)
- [`@untool/webpack`](https://github.com/untool/untool/tree/master/packages/webpack)
- [`hops-express`](https://github.com/xing/hops/tree/master/packages/express)
- [`hops-webpack`](https://github.com/xing/hops/tree/master/packages/webpack)

### Installation

Add this preset to your existing Hops React project:

```bash
$ yarn add hops-preset-defaults@next
# OR npm install --save hops-preset-defaults@next
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

### Usage

### Configuration

#### Preset Options

This preset does not have own configuration, but here is a list of the most important options from the included presets:

| Name        | Type                 | Default          | Example                                                           | Required | Description                                                                                  |
| ----------- | -------------------- | ---------------- | ----------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `https`     | `Boolean` / `Object` | `false`          | `true` or<br/>`{"keyFile": "./my.key", "certFile": "./my.cert" }` | _no_     | Configure HTTPS support for Hops                                                             |
| `host`      | `String`             | `[HOST]`         | `10.10.10.10`                                                     | _no_     | Specify the IP address that Hops should bind to                                              |
| `port`      | `String`             | `[PORT]`         | `1337`                                                            | _no_     | Specify the Port that Hops should listen on                                                  |
| `locations` | `Array<String>`      | `[]`             | `["/", "/about"]`                                                 | _no_     | An array of locations for static rendering of HTML pages                                     |
| `basePath`  | `String`             | `''`             | `/my-app`                                                         | _no_     | The URL base path from which your application will be served                                 |
| `assetPath` | `String`             | `<basePath>`     | `<basePath>/assets`                                               | _no_     | The URL base path from which the assets will be served from                                  |
| `buildDir`  | `String`             | `<rootDir>/dist` | `<rootDir>/out`                                                   | _no_     | The directory in which the build outputs will be written to                                  |
| `browsers`  | `String`             | `defaults`       | `last 1 Chrome versions`                                          | _no_     | A browserslist query to specify targets for which to transpile/polyfill.                     |
| `node`      | `String`             | `current`        | `8.10`                                                            | _no_     | A Node.js version identifier or `current` to specify for which target to transpile/polyfill. |

Head over to [`@untool/express`](https://github.com/untool/untool/tree/master/packages/express#settings) and [`@untool/webpack`](https://github.com/untool/untool/tree/master/packages/webpack#settings) to read more about these configuration options.

### Mixin Hooks API

#### `configureServer(app, middleware, mode): app` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **core**

Use this mixin hook to register middleware or configure the Express.js Application.

It receives the following arguments:

##### `app`

This is an [Express.js application](https://expressjs.com/en/api.html#app) instance that allows you to reconfigure the application.

##### `middleware`

This is an object whose keys are middleware phases and the values are arrays in which middleware can be pushed.

These are the phases available:

1.  `initial` - use this phase to register middleware that should be executed first
2.  `files` - in this phase are middleware like `express-static` to serve static files
3.  `parse` - this phase can be used to register middleware that parses data from incoming requests (e.g. `cookie-parser` or `body-parser`)
4.  `routes` - this phase registers the universal render middleware that handles all the routes in your app
5.  `final` - this phase may be used to register error handling or other middleware that should be run last

Additionally each phase also has a `pre` / `post` phase. E.g.: `preinitial` or `postfiles`.

##### `mode`

Describes the mode that the server is operating in, it can be one of: `develop`, `serve` or `static`.

- `develop` is being used when the server is started in development mode (eg. `hops develop` or `hops start`). In this mode there will be webpack middlewares included that watch and recompile your changes on the fly.
- `serve` means that the server is running in production mode (eg. `hops start -p` or `hops serve`). In this mode it will serve the build dir as static files and use the prebuilt render middleware to render your application.
- `static` is being used when the server is used to render static HTML pages (eg. `hops build -s` or `hops start -ps`). In this mode the server will not be bound to an HTTP interface but instead mock requests are being sent against the prebuilt middleware.

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class MyMixin extends Mixin {
  configureServer(app, middleware, mode) {
    middleware.routes.push((req, res, next) => next());
    if (mode === 'serve') {
      middleware.preinitial.unshift((req, res, next) => next());
      middleware.postfinal.push((req, res, next) => next());
    }
    return app;
  }
};
```

#### `configureBuild(webpackConfig, loaderConfigs, target): webpackConfig` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **core**

You can implement this method in your own mixins to modify the different [webpack configs](https://webpack.js.org/configuration/) that are used under the hood.

It receives the following arguments:

##### `webpackConfig`

This is the full webpack config for the current target, which can be mutated and returned to change its configuration.

Check out the base webpack configs being used by Hops here:

- [build](https://github.com/untool/untool/blob/master/packages/webpack/lib/configs/build.js)
- [develop](https://github.com/untool/untool/blob/master/packages/webpack/lib/configs/develop.js)
- [node](https://github.com/untool/untool/blob/master/packages/webpack/lib/configs/node.js)

##### `loaderConfigs`

This is an object that provides shortcuts to the most commonly used loaders, so that you don't have to iterate through the complicated loader structures yourself (eg. `module.rules[].oneOf[...allLoaderConfigs]`).

This object has the following properties: `{ jsLoaderConfig, urlLoaderConfig, fileLoaderConfig, allLoaderConfig }`.

##### `target`

The third argument is the target which can be one of: `build`, `develop` or `node`.

- `build` is the config being used for the production browser build.
- `develop` is the config that is being used by the devserver and contains configuration specific to hot module reloading and such.
- `node` is the config that is being used to create the server-side bundle.

```javascript
class MyMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs, target) {
    // configure webpack aliases
    webpackConfig.resolve.alias['myalias'] = 'something-else';

    // add another loader to run before all other loaders
    loaderConfigs.allLoaderConfigs.unshift({
      test: /\.tsx?$/,
      use: [{ loader: 'ts-loader' }],
    });

    // replace the file-loader with a different loader
    loaderConfigs.allLoaderConfigs.splice(
      loaderConfigs.allLoaderConfigs.indexOf(loaderConfigs.fileLoaderConfig),
      1,
      { test: /regex/, loader: 'my-loader' }
    );

    // add or modify the config of the jsLoader (babel-loader)
    loaderConfigs.jsLoaderConfig.options.plugins.push(
      '@babel/plugin-proposal-class-properties'
    );

    return webpackConfig;
  }
}
```
