# `hops-pwa`

[![npm](https://img.shields.io/npm/v/hops-pwa.svg)](https://www.npmjs.com/package/hops-pwa)

[//]: # 'TODO: add general section about presets, how to install them, how to register them, how to configure them to main Hops readme'

This is a [preset for Hops](https://missing-link-explain-what-are-presets) that can be used to enable [progressive web app](https://developers.google.com/web/progressive-web-apps/) features like a [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) and [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) usage in Hops.

### Installation

Just add this preset to your existing Hops React project:

```bash
$ yarn add hops-pwa
# OR npm install --save hops-pwa
```

[//]: # 'TODO: add general section about setting up a basic hops project to main Hops readme'

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://missing-link-explain-quick-start)

### Usage

#### Web App Manifest

To use a web app manifest just render the imported manifest via [Helmet](https://github.com/nfl/react-helmet).

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

Check out this [integration test](https://github.com/xing/hops/tree/next/packages/spec/integration/pwa) as an example for how to use this preset.

#### API

##### `installServiceWorker(): Promise<ServiceWorkerRegistration>`

This is the main export of `hops-pwa` which, when executed, will register the configured service worker and return a promise which resolves to the [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) object.

### Configuration

#### Preset Options

| Name         | Type     | Default              | Required | Description                                   |
| ------------ | -------- | -------------------- | -------- | --------------------------------------------- |
| `workerPath` | `String` | `<basePath>/sw.js`   | _no_     | The path on which to serve the service worker |
| `workerFile` | `String` | `hops-pwa/worker.js` | _yes_    | The path to the service worker entry file     |

#### Render Options

This preset has no runtime options.
