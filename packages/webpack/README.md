# `hops-webpack`

`hops-webpack` is the largest and most complex of `hops`'s core packages. It contains half of its total lines of code and provides both a [preset](../boostrap/README.md#presets) and a [core mixin](../boostrap/README.md#mixins). It provides a comprehensive, but rather minimal [`Webpack`](https://webpack.js.org) setup as a basis for your own configurations.

Based on [`hops-express`](../express/README.md), it also features development and production servers. The former even comes with [hot module replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/).

During application startup, `hops-webpack` runs a check to determine if Webpack is installed multiple times. If you see warnings telling you that this is the case, you will want to make sure you get rid of these duplicates, as they will almost certainly break things in interesting ways.

### Installation

```bash
$ yarn add hops-webpack # OR npm install hops-webpack
```

## CLI

### `build`

This is the most basic of `hops-webpack`'s commands - and it simply performs a Webpack build according to its arguments and configuration. It will not only start a usual browser build, but also one for the server-side version of your application.

To run the built application afterwards, use `hops-express`'s [`serve`-command](../express/README.md#serve);

```bash
$ hops build -p && hops serve -p
```

#### Arguments

##### `-p` / `--production`

If `hops build` is called with the `production` argument, `hops` itself sets the shell environment variable `$NODE_ENV` to `"production"`. This variable is generally used in lots of places, for example to fine-tune `hops-webpack`'s Webpack configurations.

```bash
$ hops build -p # OR hops build --production
```

This is equivalent to manually setting `$NODE_ENV` before calling the actual command. Use whatever works best in your specific setting.

```bash
$ NODE_ENV=production hops build
```

##### `--fast-build` _experimental_

Using the experimental `--fast-build` option will only transpile a predefined set of node modules. If you use a node module that ships ES language features that aren't supported by your browser matrix it might break your website. Therefore only use this feature if you have a comprehensive test setup which covers all your supported browsers.

You can extend this predefined set though by adding glob patterns to the `experimental.babelIncludePatterns` config.

### `develop`

Using this command, you can start a full-featured development server that is as similar to a production system as possible. It does, however, ensure the browser and server versions of your application are being recompiled and redeployed whenever you change your code.

```bash
$ hops develop
```

### `start`

This is probably the `hops` command your will use most of the time - we certainly do. It is, essentially, just a shorthand for other `hops` commands.

```bash
$ hops start # OR hops start -p
```

#### Arguments

##### `-p` / `--production`

If called in `production` mode, `hops start` will first perform a build and start an express server afterwards. Otherwise it will start a development server. `hops start -p` is thus equivalent to `hops build -p && hops serve -p`, while `hops start` is equivalent to `hops develop`. All arguments are used as documented with those other commands.

Of course, once again, you can also manually set `$NODE_ENV`.

```bash
$ NODE_ENV=production hops start
```

##### `--parallel-build` / `--no-parallel-build`

A Hops build will fork its process in order to let the Webpack builds run in parallel child processes. While it usually does not reduce the build time it actually helps to significantly reduce the peak memory consumption of the build.

This feature is enabled by default and can be disabled via the `--no-parallel-build` (or `--parallel-build=false`) argument.

##### `--fast-dev` _experimental_

Using the experimental `--fast-dev` option will disable automatic polyfilling and transpiling of all `node_modules` files through babel to enable faster development times. This will lead to a different bundle being created than in production mode and will not work in all browsers (modern browsers only). Use with caution and report any bugs you may encounter.

**DO NOT USE THIS MODE FOR QA OR PRODUCTION**

##### `--experimental-esbuild` _experimental_

Using the experimental `--experimental-esbuild` option will replace the `babel-loader` of Hops's internal Webpack config with the `esbuild-loader`. While esbuild is significantly faster than Babel, it's still early-stage and might lead to unexpected results.

To use it, install [`esbuild-loader`](https://www.npmjs.com/package/esbuild-loader) and [`esbuild-jest`](https://www.npmjs.com/package/esbuild-jest) as dev-dependencies in your project.

In order to use esbuild in Jest you need to set the `USE_EXPERIMENTAL_ESBUILD` environment variable to `true`.

```sh
USE_EXPERIMENTAL_ESBUILD=true npm test
```

**Please be aware that things are working differently in esbuild than Babel. The currently known drawbacks and limitations are:**

- esbuild is not on a stable release cycle yet. Please also read about the [production readyness](https://esbuild.github.io/faq/#production-readiness) from the main author.
- esbuild does not typecheck your TypeScript files, it can only convert them to JavaScript.
- to use the JSX syntax in TypeScript you have to use the `.tsx` extention. We recommend to also use the `.jsx` extention for JavaScript based JSX files to be consistent, even though it's not required.
- it does not support [the new JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html), so it's up to you to import `React` into every component
- Hops' `importComponent` is currently a Babel plugin and for esbuild we only implemented the transpilation of the simple syntax for now (arrow function with import expression). That means it only supports default imports, but no named imports.

```js
// example of supported syntax:
const Home = importComponent(() => import('./home'));
// example of unsupported syntax:
const Home = importComponent(
  () => import('./home'),
  (namespace) => namespace.Home
);
```

And there might be more issues. So please report any bugs you may encounter to us.

## API

`hops-webpack` provides a couple of configurable exports for your convenience: mixin hooks marked with 'callable' below can be called like in the following example example:

```javascript
const { build } = require('hops-webpack');
build();
```

If you need to provide config overrides or options to these kinds of calls, you can do so like in the next example.

```javascript
const { configure } = require('hops-webpack');
const { build } = configure(configOverrides, options);
build();
```

The above example is functionally equivalent to directly working with `hops-bootstrap`'s [`bootstrap`](../boostrap/README.md#bootstrapconfigoverrides-options-build-only) export.

### `configureBuild(webpackConfig, loaderConfigs, target)` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

If you implement this mixin hook in your `hops-bootstrap` [`core` mixin](../boostrap/README.md#mixins), you will be able to modify the different Webpack configs `hops` uses in any way you like.

In addition to the actual `webpackConfig`, which, by the way, your implementation is expected to return, you will receive an object containing all `loaderConfigs` and a `target` argument. This last argument can be `build`, `develop`, or `node`.

```javascript
const { Mixin } = require('hops-mixin');

module.exports = class MyMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs, target) {
    webpackConfig.resolve.extensions.push('.ftw');
  }
};
```

You can use whatever mechanism you like to modify the complicated structures Webpack configs unfortunately have to be. For convenience, `loaderConfigs` contains the following properties for you to inspect and modify specific loader configs directly:

| Property | Explanation |
| --- | --- |
| `jsLoaderConfig` | [`babel-loader` config](https://github.com/babel/babel-loader) |
| `urlLoaderConfig` | [`url-loader` config](https://github.com/webpack-contrib/url-loader) |
| `fileLoaderConfig` | [`file-loader` config](https://github.com/webpack-contrib/file-loader) |
| `allLoaderConfigs` | `Array` of loader configs passed to [`oneOf` module loader rule](https://webpack.js.org/configuration/module/#rule-oneof) |

**Caveat**: please be advised that, while we strive to provide very stable `webpackConfig` and `loaderConfigs` arguments, these may change in subtle ways between `minor` versions of `hops-webpack`. For example, specific loader options may stop working. Additionally, other mixins may alter these arguments in relevant ways, so code accordingly.

### `inspectBuild(stats, config)` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

If you want to programmatically determine whether a build went well, your mixin can implement this method. It will be called with a Webpack [`stats`](https://webpack.js.org/api/node/#stats-object) object and the actual configuration used for the specific build you are inspecting.

### `build()` ([callable](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

If you want to intialize a build of your application, you can do so using this utility mixin method. It returns a `Promise` resolving to a [`stats`](https://webpack.js.org/api/node/#stats-object) object.

_This method is also exported so that you can use it in your own, non-mixin code. Import it like so: `import { build } from 'hops-webpack';`. In this mode, it also accepts another argument, `options`, which you can pass any CLI argument to._

### `clean()` ([callable](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

Using this utility mixin method, you can delete your `buildDir` and all of its contents. It returns a `Promise`.

_This method is also exported so that you can use it in your own, non-mixin code. Import it like so: `import { clean } from 'hops-webpack';`. In this mode, it also accepts another argument, `options`, which you can pass any CLI argument to._

### `getWebpackBuildConfig(target)` ([callable](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

Returns the webpack config for the production build after `configureBuild` has been applied. `target` argument can be `browser` or `none` and will determine which mixins should be bundled.

_This method is also exported so that you can use it in your own, non-mixin code. Import it like so: `import { getWebpackBuildConfig } from 'hops-webpack';`. In this mode, it also accepts another argument, `options`, which you can pass any CLI argument to._

### `getWebpackDevelopConfig(target)` ([callable](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

Returns the webpack config for the development build after `configureBuild` has been applied. `target` argument can be `browser` or `none` and will determine which mixins should be bundled.

_This method is also exported so that you can use it in your own, non-mixin code. Import it like so: `import { getWebpackDevelopConfig } from 'hops-webpack';`. In this mode, it also accepts another argument, `options`, which you can pass any CLI argument to._

### `getWebpackNodeConfig(target)` ([callable](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

Returns the webpack config for the server-side Node.js build after `configureBuild` has been applied. `target` argument can be `server` or `none` and will determine which mixins should be bundled.

_This method is also exported so that you can use it in your own, non-mixin code. Import it like so: `import { getWebpackNodeConfig } from 'hops-webpack';`. In this mode, it also accepts another argument, `options`, which you can pass any CLI argument to._

## Settings

| Property     | Type       | Default                                        |
| ------------ | ---------- | ---------------------------------------------- |
| `browsers`   | `[string]` | `['defaults']`                                 |
| `node`       | `string`   | `'current'`                                    |
| `basePath`   | `string`   | `''`                                           |
| `assetPath`  | `string`   | `'<basePath>'`                                 |
| `buildDir`   | `string`   | `'<distDir>'`                                  |
| `serverDir`  | `string`   | `'<rootDir>/node_modules/.cache/hops-webpack'` |
| `serverFile` | `string`   | `'server.js'`                                  |
| `statsFile`  | `string`   | `'stats.json'`                                 |

### `browsers`

This is a [`browserslist`](https://github.com/browserslist/browserslist) configuration that is being used and Babel's [`preset-env`](https://babeljs.io/docs/plugins/preset-env/) to determine what language features need to be transpiled and/or polyfilled for your target platforms.

```json
{
  "browsers": ["last 1 Chrome versions"]
}
```

### `node`

This is the target Node.js version Babel's [`preset-env`](https://babeljs.io/docs/plugins/preset-env/) transpiles features for. Usually you will want to keep its default, as it is best practice to develop and build your application on the same Node version as you run in production.

```json
{
  "node": "14.5"
}
```

### `basePath`

This is the URL base path, i.e. subfolder, your application will be served from.

```json
{
  "basePath": "<name>"
}
```

### `assetPath`

This is the URL base path, i.e. subfolder, your application's assets will be served from. If set, this folder will be created in your `buildDir` at build time.

```json
{
  "assetPath": "<basePath>/assets"
}
```

### `buildDir`

Path of your browser build output. By default, this folder is usually removed before building. Make sure the contents of this folder can be served by your webserver.

```json
{
  "buildDir": "<rootDir>/build"
}
```

### `serverDir`

Path of your server build output. It will only be used in `production`-mode. By default, this folder is located inside your `node_modules` folder and it is usually removed before building.

```json
{
  "serverDir": "<buildDir>"
}
```

### `serverFile`

Path of your server output file, relative to [`serverDir`](../webpack/README.md#serverdir). It will only be generated in `production`-mode and is being used internally.

```json
{
  "serverFile": "server.js"
}
```

### `statsFile`

Path of your stats file, relative to [`serverDir`](../webpack/README.md#serverdir). It will only be generated in `production`-mode and is being used internally.

```json
{
  "assetFile": "stats.json"
}
```

## Debugging

Available tags for the [`debug`](https://www.npmjs.com/package/debug)-module are:

- `hops:webpack:config:build`
- `hops:webpack:config:develop`
- `hops:webpack:config:node`
- `hops:webpack:dependencies`
