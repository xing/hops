# Hops Config

[![npm](https://img.shields.io/npm/v/hops-config.svg)](https://www.npmjs.com/package/hops-config)

hops-config exposes options to configure the other Hops packages and your own application. It is quite flexible and highly extensible.

# Installation

In case you want to extend the configuration or access it from your server/browser code, you should explicitly add `hops-config` as a dependency to your project.\
Otherwise it will be installed through the other hops packages and doesn't need to be installed directly.

```
npm install --save hops-config
```

# Usage

Please find a list of the default options below. They can be set in your project's package.json (or dedicated files - see below). You can extend hops-config within your project allowing you to use it to configure your isomorphic applications.

## Available Options

| Field           | Type                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `https`         | `Boolean`                  | Whether to use https or not. Defaults to `false`                                                                                                                                                                                                                                                                                                                                                                                                                |
| `host`          | `String`                   | Host name of your project. Defaults to `0.0.0.0`                                                                                                                                                                                                                                                                                                                                                                                                                |
| `port`          | `Number`                   | Port of your host. Defaults to `8080`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `locations`     | `Array<string>`            | One or more [application shell](https://developers.google.com/web/fundamentals/architecture/app-shell) locations, e.g. `"/"` and/or `"/profile"`                                                                                                                                                                                                                                                                                                                |
| `basePath`      | `String`                   | Root path of your application on the server. This is inserted as an HTTP path prefix between `host` and `locations`. For example, if you set e.g. `"basePath": "my-custom-basepath"` and `"location": ["/profile"]`, then your application would be available at `http://0.0.0.0:8080/my-custom-basepath/profile/`                                                                                                                                              |
| `assetPath`     | `String`                   | HTTP root path of your asset files on the server. It's not dependent on `basePath`, you can define totally separate directories                                                                                                                                                                                                                                                                                                                                 |
| `browsers`      | `String`                   | [Browserslist](https://www.npmjs.com/package/browserslist) query. Defaults to `"> 1%, last 2 versions, Firefox ESR"` (which is also the Browserlist default query). It is used for Babel and PostCSS                                                                                                                                                                                                                                                            |
| `node`          | `String`                   | [Node target version](https://www.npmjs.com/package/babel-preset-env#targetsnode). Defaults to `current`. It is used to specify the Node version which Babel should compile for                                                                                                                                                                                                                                                                                 |
| `envVars`       | `{ HOPS_MODE: 'dynamic' }` | Environment variables meant to be passed to [`webpack.EnvironmentPlugin`](https://webpack.js.org/plugins/environment-plugin/), i.e. made accessible to your app                                                                                                                                                                                                                                                                                                 |
| `moduleDirs`    | `Array<string>`            | One or more directories that Hops should use for module path resolution. For example, you can specify a directory that holds a yet unpublished Node.js package. It works similar to the [resolve.modulesDirectories](http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories) field in Webpack, i.e. if you specify `moduleDirs: ["my-module-dir"]`, it will look in `./my-module-dir`, `../my-module-dir`, `../../my-module-dir` and so on |
| `appDir`        | `String`                   | Directory of your app. This way, you can put your app to a place other than project root. Defaults to `"."`                                                                                                                                                                                                                                                                                                                                                     |
| `buildDir`      | `String`                   | Directory where the build artifacts (i.e. your application/asset files) will be saved to. Defaults to `"build"`. Hops always removes the specified directory before starting a new build                                                                                                                                                                                                                                                                        |
| `cacheDir`      | `String`                   | Directory where internally used artifacts not meant to be served will be output (e.g. the `manifest.json`/`manifest.js` files generated by Webpack). Defaults to `"node_modules/.cache/hops"`                                                                                                                                                                                                                                                                   |
| `buildConfig`   | `String`                   | Path to your Webpack build configuration file. Defaults to `undefined` - use this option in your `package.json` to overwrite the default configuration. Read more about it at [hops-build-config](https://github.com/xing/hops/tree/master/packages/build-config#available-options)                                                                                                                                                                             |
| `developConfig` | `String`                   | Path to your Webpack development configuration file. Defaults to `undefined` - use this option in your `package.json` to overwrite the default configuration. Read more about it at [hops-build-config](https://github.com/xing/hops/tree/master/packages/build-config#available-options)                                                                                                                                                                       |
| `nodeConfig`    | `String`                   | Path to your Webpack node/server-side rendering configuration file. Defaults to `undefined` - use this option in your `package.json` to overwrite the default configuration. Read more about it at[hops-build-config](https://github.com/xing/hops/tree/master/packages/build-config#available-options)                                                                                                                                                         |
| `manifest`      | `String`                   | The application's `manifest.js` as a string. Defaults to a getter function that returns the content of the automatically generated `manifest.js`                                                                                                                                                                                                                                                                                                                |
| `assets`        | `Object literal`           | The applications's `.js` and `.css` assets. Defaults to a getter function that returns the assets contained in the automatically generated `manifest.json`                                                                                                                                                                                                                                                                                                      |
| `extends`       | `String`                   | Path to a baseline configuration (could be for example a node module or a project-specific file), allowing you join the current configuration with that baseline                                                                                                                                                                                                                                                                                                |

All keys matching `/(config|file|dir)s?$/i` will be treated as a filesystem path (or array thereof) and resolved relative to your app's root folder. This only applies if the respective value is not an absolute path already.

Additionally, you can use placeholders within such filesystem configs to reference others. For example, by configuring `"fooDir": "<cacheDir>/foo"`, you can specify a subfolder of cache directory.

## Configure via `package.json`

The following example package.json shows how the config object might look like:

```JSON
{
  "hops": {
    "extends": "path-to-my-hops-config/config.js",
    "https": true,
    "host": "0.0.0.0",
    "port": 3000,
    "locations": [
      "/",
      "/foo"
    ],
    "basePath": "my-base-path",
    "assetPath": "my-asset-path",
    "browsers": "> 2%, last 1 versions, Firefox ESR",
    "moduleDirs": [
      "my-unpublished-packages"
    ],
    "appDir": "my-app-directory",
    "buildDir": "my-build-directory",
    "cacheDir": "my-cache-directory",
    "buildConfig": "path-to-my-custom-webpack-config/build.js"
  }
}
```

## Configure via Dedicated File

Hops looks for configuration objects in a couple of different places (starting from `process.cwd()`), in this order:

1. `hops` property in your package.json file
2. `.hopsrc` (or `.hopsrc.(js|json|ya?ml)`)
3. `hops.config.js` JS file exporting the object

You can use whatever suits you best, but please only use a single location in your project's root folder. Hops does not attempt to merge configurations stored in different locations: it uses the first config it finds.

## Environment Specific Configuration

Take the above package.json - and let's say you want to want to override the `port` value. To override the port value for your local environment without changing your application's overall config, add an environment specific config...

```JSON
{
  "hops": {
    "port": 3000,
    "env": {
      "my-environment": {
        "port": 1337
      }
    }
  }
}
```

... and then run...

```
HOPS_ENV=my-environment yarn start
```

... which will start your server on port 1337.

Hops uses environment variables to determine the env it is running in. Specifically, it uses `HOPS_ENV` and if that does not exist, it uses `NODE_ENV`.

## Custom Webpack Configuration

For further information on how to extend the base webpack configurations head over to: [hops-build-config](https://github.com/xing/hops/tree/master/packages/build-config).
