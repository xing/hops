# `hops-express`

[![npm](https://img.shields.io/npm/v/hops-express.svg)](https://www.npmjs.com/package/hops-express)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This package has been [deprecated](../../DEPRECATIONS.md#dep0002) as of version 12 of Hops, the contained Express configuration has been moved to [`@untool/express`](https://github.com/untool/untool/tree/master/packages/express). If you happened to have installed this package to create a custom collection of presets, you can safely remove it.

This package will be removed with the next major release of Hops.

### CLI

#### `serve`

This command starts an Express.js server with all middleware and configuration applied through the `configureServer` hook.

##### Arguments

###### `-p` / `--production`

This is a shortcut for `NODE_ENV=production hops serve` - it sets the environment variable `NODE_ENV` to `production` which enables several performance optimizations for Express.js and its middleware.

You may use either `hops serve -p` or its equivalent `NODE_ENV=production hops serve`.

### Usage

### Configuration

#### Preset Options

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `https` | `Boolean | Object` | `false` | _no_ | Configure HTTPS support for Hops |
| `host` | `String` | `[HOST]` | _no_ | Specify the IP address that Hops should bind to |
| `port` | `String` | `[PORT]` | _no_ | Specify the Port that Hops should listen on |
| `locations` | `Array<String>` | `[]` | _no_ | An array of locations for static rendering of HTML pages |
| `basePath` | `String` | `''` | _no_ | The URL base path from which your application will be served |
| `assetPath` | `String` | `<basePath>` | _no_ | The URL base path from which the assets will be served from |
| `buildDir` | `String` | `<rootDir>/dist` | _no_ | The directory in which the build outputs will be written to |

##### `https`

Hops has built in support for HTTPS which can be configured using this setting.

You can set it to `true` to enable SSL with the included self-signed certificate or you can specify an object with `keyFile` and `certFile` that point a proper SSL certificate.

```json
"hops": {
  "https": {
    "keyFile": "./path/to/my.key",
    "certFile": "./path/to/my.cert"
  }
}
```

##### `host`

By default Hops will read an environment variable called `$HOST` to find the host that the server should bind to. If `$HOST` and the config `host` are not defined, Hops will bind the server to the [unspecified IPv6 or IPv4 address](https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback) (`::` or `0.0.0.0`).

```json
"hops": {
  "host": "10.10.10.10"
}
```

##### `port`

The port on which the server will be listening. By default Hops will try to read the environment variable `$PORT`. If neither `$PORT` nor the `port` config are set, Hops will try to find a free port, starting at `>=8080`.

```json
"hops": {
  "port": "8080"
}
```

##### `locations`

Use this setting to define routes for static prerendering. Simply list all URLs that you want to prerender and execute `$ hops build -ps`.

```json
"hops": {
  "locations": ["/foo", "/bar"]
}
```

##### `basePath`

This is the URL base path, for example, when you want to serve your application from a subfolder.

```json
"hops": {
  "basePath": "/foo"
}
```

##### `assetPath`

This is the URL base path (subfolder) from which your assets will be served.

```json
"hops": {
  "assetPath": "<basePath>/assets"
}
```

##### `buildDir`

This is the file-system path to where the generated assets will be written and served from.

```json
"hops": {
  "buildDir": "<rootDir>/dist"
}
```

#### Render Options

This preset has no runtime configuration options.

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

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

#### `inspectServer(app, target): app` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel)) **core**

Implement this hook to get access to the listening instance of [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server) (or [`https.Server`](https://nodejs.org/api/https.html#https_class_https_server)). The second argument `target` will be one of `develop`, `serve`.

Use this hook to read the listening address or to register your application with a loadbalancer.

#### `createServer(mode): app` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **core**

With this mixin hook it is possible to get a fully configured Express.js application instance that you can register with your own server.

It accepts `develop`, `serve` or `static` as `mode`.

#### `runServer(mode): void` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **core**

In case you want to programmatically start a server, you can use this mixin hook.

It accepts `develop` or `serve` as `mode`.

#### `createRenderer(): (options) => Promise<Response>` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **core**

This mixin method creates the static renderer. When called it returns a function that accepts an options hash or an url and returns a Promise that resolves to the statically rendered page.

#### `renderLocations(): Promise<Responses>` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **core**

This mixin method creates a fully configured Express.js application and renders all your configured `locations` to strings.

It returns a Promise that resolves to an object whose keys are your configured `locations` and the values are the rendered pages.
