# `hops-pwa`

[![npm](https://img.shields.io/npm/v/hops-pwa.svg)](https://www.npmjs.com/package/hops-pwa)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that can be used to enable [progressive web app](https://developers.google.com/web/progressive-web-apps/) features like a [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) and [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) usage in Hops.

### Installation

Add this preset to your existing Hops React project:

```bash
npm install --save hops-pwa
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### Usage

#### Web App Manifest

When you `import` / `require` a web app manifest in your application code you will get an URL to the web app manifet which you can, for example, render in a `<link />` element via [React Helmet Async](https://github.com/staylor/react-helmet-async).

```javascript
import manifest from './manifest.webmanifest';
// inside a components render method
<Helmet>
  <link rel="manifest" href={manifest} />
</Helmet>;
```

Images that are referenced inside the web app manifest will be copied to the public directory and its references inside the webmanifest will be updated.

#### Service Worker

In order to use a service worker you need to configure the path to your worker file via the [`workerFile` preset option](#preset-options) and then import the `installServiceWorker()` function from `hops-pwa`.

```javascript
import installServiceWorker from 'hops-pwa';

installServiceWorker();
```

Check out this [integration test](../spec/integration/pwa) as an example for how to use this preset.

#### Consumer API

##### `installServiceWorker(): Promise<ServiceWorkerRegistration>`

This is the main export of `hops-pwa` which, when executed, will register the configured service worker and return a promise which resolves to the [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) object.

### Configuration

#### Preset Options

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `workerPath` | `String` | `<basePath>/sw.js` | _no_ | The path on which to serve the service worker |
| `workerFile` | `String` | `hops-pwa/worker.js` | _yes_ | The path to the service worker entry file |

##### `workerPath`

This configures the path on which to serve the service worker.

##### `workerFile`

This is the path to the service worker source file which will be compiled via webpack and served on the [`workerPath`](#workerpath).

The service worker is expected to export a function with the following signature: `(config, assets): void`.

The `assets` parameter is an array of asset urls that your build produced (referenced images, styles, scripts, etc) and might be used for precaching them.

```javascript
export default (config, assets) => {
  // your worker code goes here. e.g.:
  self.addEventListener('install', event => {
    event.waitUntil(precache(assets));
  });
};
```

#### Render Options

This preset has no runtime options.
