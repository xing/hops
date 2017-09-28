
# Hops Build

hops-build is a wrapper around webpack and [hops-build-config](https://github.com/xing/hops/tree/master/packages/build-config) which exports a function to execute a single build.


### API

## `runBuild(options, callback)`
`runBuild()` can be used to execute a webpack build.  
If being used with the `static` option set to `true` it will generate html files for all locations configured in your package.json.  
If being used without the `static` option it will run the webpack build for the `buildConfig` and `nodeConfig` (see [hops-build-config](https://github.com/xing/hops/tree/master/packages/build-config) for more details).

`runBuild()` supports the following options:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| static | boolean | `false` | Whether to statically build app shells for all locations |
| clean | boolean | `false` | Whether to clean the build and cache directories before starting the build |

The `callback` is being called after the build has finished and can be used to schedule further work.

## `runServer(options, callback)`
`runServer()` can be used to start a `webpack-dev-server`.
It will take the `developConfig` with its `watchConfig` (see [hops-build-config](https://github.com/xing/hops/tree/master/packages/build-config) for more details) and start a `webpack-dev-server`.

`runServer()` supports the following options:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| clean | boolean | `false` | Whether to clean the build and cache directories before starting the server |

The `callback` is being called after the server has started and can be used to schedule further work.


### Target Audience

If you want to programmatically start a webpack build then you should use this module.


### Example

#### `build.js`

```javascript
var hopsBuild = require('hops-build');

hopsBuild.runBuild({}, function () {
  console.log('the build has finished');
});
```
