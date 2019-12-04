# `hops-development-proxy`

[![npm](https://img.shields.io/npm/v/hops-development-proxy.svg)](https://www.npmjs.com/package/hops-development-proxy)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

[Hops preset](https://github.com/xing/hops/tree/master#presets) that adds an API-proxy for development.

Hops apps are often run on the same host as their backend/api endpoints. However, when working locally, backend apps often run on a different host as the frontend application. This can cause issues with cross origin requests during development that are of no concern in the production environment.

This package allows to proxy requests to your api server which runs on a different host/port.

## Installation

Add `hops-development-proxy` to your project.

```bash
npm install --save hops-development-proxy
```

### Usage

`hops-development-proxy` attaches a proxy when the application runs in development mode. It does not do anything when run in production mode.

### Configuration

#### Preset Options

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `proxy` | `String` \| `Object` | `undefined` | _no_ | Proxy target configuration |

##### proxy

Configures where to proxy API requests to.

Simplest way to set up the proxy is to configure the proxy target URL as string. In this case, the proxy target URL is used for every request that is not an HTML document (i.e. a requested page) or an asset (js file, css file etc.) served by the webpack dev server.

Example

`.hopsrc.js`

```javascript
module.exports = {
  proxy: 'https://example.org/',
};
```

`browser GET /` -> Is handled by your Hops application, because browser requests an html file.

`GET /assets/main.js` -> Will always be handled by webpack dev server, because it takes precedence.

`fetch GET /api/data` -> Is proxied to https://example.org/, results in `https://example.org/api/data` being requested.

If more flexibility is needed, `proxy` can also be configured as an object, where the keys represent express route matchers to be proxied and `target` to configure the respective proxy target.

`.hopsrc.js`

```javascript
module.exports = {
  proxy: {
    '/api': { target: 'https://example.org/' },
    '/legacy-api': { target: 'https://example.org/old' },
  },
};
```

When the object notation is used, every request that is not handled by the webpack dev server, will be proxied as long as the route matches. This is also true for html documents.

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

#### `onProxyReq(): void` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#definesequence)) **core**

Hook to implement [http-proxy-middleware `onProxyReq` event callback](https://github.com/chimurai/http-proxy-middleware#http-proxy-events).

##### Example: Add request headers

Sometimes additional request headers are needed, for example to add a fake user id for the backend api.

`mixin.core.js`

```javascript
const { Mixin } = require('hops');

class MyMixin extends Mixin {
  onProxyReq(proxyReq) {
    proxyReq.setHeader('X-USER-ID', '23');
  }
}

module.exports = MyMixin;
```

#### `onProxyRes(): void` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#definesequence)) **core**

Hook to implement [http-proxy-middleware `onProxyRes` event callback](https://github.com/chimurai/http-proxy-middleware#http-proxy-events).

#### `onProxyError(): void` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#definesequence)) **core**

Hook to implement [http-proxy-middleware `onError` event callback](https://github.com/chimurai/http-proxy-middleware#http-proxy-events).
