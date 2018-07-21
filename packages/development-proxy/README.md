# `hops-development-proxy`

[![npm](https://img.shields.io/npm/v/hops-development-proxy.svg)](https://www.npmjs.com/package/hops-development-proxy)

[Hops preset](https://missing-link-explain-what-are-presets) that adds an API-proxy for development.

Hops apps are often run on the same host as their backend/api endpoints. However, when working locally, backend apps often run on a different host as the frontend application. This can cause issues with cross origin requests during development that are of no concern in the production environment.

This package allows to proxy requests to your api server which runs on a different host/port.

## Installation

Add `hops-development-proxy` to your project.

```bash
$ yarn add hops-development-proxy
# OR npm install --save hops-development-proxy
```

### Usage

`hops-development-proxy` attaches a proxy when the application runs in development mode. It does not do anything when run in production mode.

### Configuration

#### Preset Options

| Name    | Type                 | Default     | Required | Description                |
| ------- | -------------------- | ----------- | -------- | -------------------------- |
| `proxy` | `String` \| `Object` | `undefined` | _no_     | Proxy target configuration |

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

If more flexibility is needed, `proxy` can also be configured as an object, where the keys represent express route matchers to be proxied and the values configure the respective proxy. In the config, any [http-proxy-middleware option](https://github.com/chimurai/http-proxy-middleware#options) can be used.

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

### Examples

#### Adding request headers

Sometimes additional request headers are needed, for example to add a fake user id for the backend api. Since any [http-proxy-middleware option](https://github.com/chimurai/http-proxy-middleware#options) can be used, you can make use of the `onProxyReq` callback to add additional headers.

`.hopsrc.js`

```javascript
module.exports = {
  proxy: {
    '/api': {
      target: 'https://httpbin.org/anything/',
      onProxyReq(proxyReq) {
        proxyReq.setHeader('x-USER-ID', '27');
      },
    },
  },
};
```
