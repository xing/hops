# `hops-webpack`

[![npm](https://img.shields.io/npm/v/hops-webpack.svg)](https://www.npmjs.com/package/hops-webpack)

This is one of the core presets for Hops (and is included by default in [`hops-preset-defaults`](https://github.com/xing/hops/tree/next/packages/preset-defaults)) and provides the webpack configuration and mixin infrastructure in order to build a Hops application.

### Installation

As this is a base preset that is always required and is included in `hops-preset-defaults` you should add the defaults preset to your project:

```bash
$ yarn add hops-preset-defaults
# OR npm install --save hops-preset-defaults
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/wip-docs-next#quick-start)

### CLI

#### `build`

This command executes a webpack build of the browser and server bundles of your application.

##### Arguments

###### `-p` / `--production`

This is just a shortcut for `NODE_ENV=production hops build` - it sets the environment variable `NODE_ENV` to `production` which enables several performance optimizations for webpack and its plugins.

You may use either `hops build -p` or `NODE_ENV=production hops build`.

###### `-s` / `--static`

When this option is set, the build will generate static HTML pages for all `locations` configured in your Hops config. Otherwise it will generate a `server.js` and `assets.json` file to be used with server-side rendering.

###### `-c` / `--clean`

Whether to perform a `clean()` operation (deleting `buildDir` and all its contents) before build or not.

This is `true` by default and can be disabled via `--no-clean`.

#### `develop`

This command starts your Hops application in development mode - which enables [Hot Module Replacement](https://webpack.js.org/api/hot-module-replacement/) and watch mode for webpack. It also disables certain optimizations, such as minification.

#### `start`

This command does different things depending on its arguments:

When executed with `-p` / `--production` it will first perform a production build and then start a production server (which is basically just `hops build -p && hops serve -p`).

When executed without `-p` / `--production` it will start a development server.

##### Arguments

###### `-p` / `--production`

Sets the `NODE_ENV` to `production` - see description for [`build`](#build) for more details.

###### `-s` / `--static`

Renders static HTML pages (only applicable when used together with `--production`) - see description for [`build`](#build) for more details.

###### `-c` / `--clean`

Skip cleanup for production builds (only applicable when used together with `--production`) - see description for [`build`](#build) for more details.

### Usage

### Configuration

#### Preset Options

| Name         | Type     | Default       | Required | Description                                                                                           |
| ------------ | -------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `browsers`   | `String` | `defaults`    | _no_     | A browserslist query to specify targets for which to transpile/polyfill.                              |
| `node`       | `String` | `current`     | _no_     | A Node.js version identifier or `current` to specify for which target to transpile/polyfill.          |
| `serverFile` | `String` | `server.js`   | _no_     | A file-system path (relative to `buildDir`) to specify where to write the generated server.js file.   |
| `assetFile`  | `String` | `assets.json` | _no_     | A file-system path (relative to `buildDir`) to specify where to write the generated assets.json file. |

##### `browsers`

This is a [`browserslist` query](https://github.com/browserslist/browserslist) that is being used by [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env#browsers) and [`babel-preset-env`](https://babeljs.io/docs/plugins/preset-env/) to determine what language features need transpiling and/or polyfilling.

```json
"hops": {
  "browsers": "last 1 Chrome versions"
}
```

##### `node`

This is the target Node.js version that [`babel-preset-env`](https://babeljs.io/docs/plugins/preset-env/) should transpile for.

```json
"hops": {
  "node": "8.10"
}
```

##### `serverFile`

Path to the generated `server.js` file (relative to [`buildDir`](https://github.com/xing/hops/tree/next/packages/express#builddir)) which contains the render middleware for server-side rendering. It is only being used internally and most probably never needs to be changed from its default value.

```json
"hops": {
  "serverFile": "server.js"
}
```

##### `assetFile`

Path to the generated `assets.json` file (relative to [`buildDir`](https://github.com/xing/hops/tree/next/packages/express#builddir)), which is being used internally for server-side rendering to determine which assets should be loaded through the generated HTML.

```json
"hops": {
  "assetFile": "assets.json"
}
```

#### Render Options

This preset has no runtime configuration options.

### Mixin Hooks API

#### `configureBuild(webpackConfig, loaderConfigs, target): webpackConfig` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe))

You can implement this method in your own mixins to modify the different [webpack configs](https://webpack.js.org/configuration/) that are used under the hood.

Check out the base webpack configs being used by Hops here:

- [build](https://github.com/untool/untool/blob/master/packages/webpack/lib/configs/build.js)
- [develop](https://github.com/untool/untool/blob/master/packages/webpack/lib/configs/develop.js)
- [node](https://github.com/untool/untool/blob/master/packages/webpack/lib/configs/node.js)

The first argument is always the full webpack config for the current target which can be mutated and returned to configure additional parameters.

The second argument is an object of: `{ jsLoaderConfig, urlLoaderConfig, fileLoaderConfig, allLoaderConfig }` to enable easier access to the loaders used in `module.rules[1].oneOf[...allLoaderConfigs]`.

The third argument is the target which can be one of: `build`, `develop`, `node`.

```javascript
class MyMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs, target) {
    // configure webpack aliases
    webpackConfig.resolve.alias['myalias'] = 'something-else';
    // add another loader before all other loaders
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
      'babel-plugin-transform-class-properties'
    );

    return webpackConfig;
  }
}
```

##### `inspectBuild(stats, webpackConfig): void` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

In order to get information about the current build you can implement this mixin method which will be called with a [webpack `stats` object](https://webpack.js.org/api/node/#stats-object) and the actual webpack config for this build.

```javascript
class MyMixin extends Mixin {
  inspectBuild(stats, webpackConfig) {
    console.log(stats.toString());
  }
}
```

##### `build(): Promise<stats>` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

If you want to programmatically trigger a build you can execute this mixin method. It returns a promise that resolves to a [webpack `stats` object](https://webpack.js.org/api/node/#stats-object).

##### `clean(): Promise<void>` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

Executing this mixin method will delete the `buildDir` and all its contents.
