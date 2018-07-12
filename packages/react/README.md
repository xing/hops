# `hops-react`

[![npm](https://img.shields.io/npm/v/hops-react.svg)](https://www.npmjs.com/package/hops-react)

[//]: # 'TODO: add general section about presets, how to install them, how to register them, how to configure them to main Hops readme'

This is a [preset for Hops](https://missing-link-explain-what-are-presets) that enables React, JSX, React-Helmet and React-Router support in Hops applications.

### Installation

Just add this preset and its peer dependencies `react`, `react-dom`, `react-helmet` and `react-router-dom` to your existing Hops React project:

```bash
$ yarn add hops-react react react-dom react-helmet react-router-dom
# OR npm install --save hops-react react react-dom react-helmet react-router-dom
```

[//]: # 'TODO: add general section about setting up a basic hops project to main Hops readme'

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://missing-link-explain-quick-start)

### Usage

After installing this preset your main entry file (either referenced via `package.json` `"main"` entry or named as `index.js`) must `default export render(<MyApp />)` from `hops-react`.

```javascript
import { render } from 'hops-react';
import React from 'react';

export default render(<h1>Hello World!</h1>);
```

Check out this [integration test](https://github.com/xing/hops/tree/next/packages/spec/integration/react) as an example for how to use this preset.

#### Consumer API

##### `render(element[, options]): UniversalRenderImplementation`

This is the main render method that you need to export from your entry file to render your application. It optionally accepts an options hash where you can configure certain runtime mixins.

##### `<Header name="String" value="String" />`

Use this side-effect component to specify HTTP header values that should be set during server-side rendering.

##### `<Miss />`

Place this side-effect component after the last `<Route />` in your React Router's `<Switch />` component to signal the server that it should respond with a `404` status code.

##### `<Status code={Number} />`

This side-effect component can be used to set specific HTTP status codes for server-side rendering.

##### `withServerData(Component): HigherOrderComponent`

Wrap your component with this HoC to get access to the prop `serverData` which contains all values of mixins that have implemented the `getServerData` hook.

##### `<ServerDataContextConsumer>{data => /* render something */}</ServerDataContextConsumer>`

This is a convenience export. If you don't want to use the above mentioned HoC you can also use this React Context consumer instead. It will accept a function as a child component and pass the `serverData` object to it.

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.

### Mixin Hooks API

#### `render([req, res, next]): void` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

This is the default React universal render method which exposes the following hooks. You will usually not have to override this. See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#renderreq-res-next-override) for more details.

#### `bootstrap([req, res]): void` ([parallel](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

You can implement this method to run tasks before any rendering occurs to bootstrap your application. See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#bootstrapreq-res-parallel) for more details.

#### `enhanceElement(element): element` ([compose](https://github.com/untool/mixinable/blob/master/README.md#definecompose))

Implement this method to wrap your application component tree with additional components. Like a `<Provider />` for Redux or some custom `<ContextProvider />` when using [React Context](https://reactjs.org/docs/context.html). See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#enhanceelementelement-compose) for more details.

#### `fetchData(data, element): data` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe))

Implement this method to fetch additional data before React's `renderToString()` method is called. See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#fetchdatadata-element-pipe) for more details.

#### `getTemplateData(data): data` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe))

Implement this method to modify the `data` object after React's rendering has occured. This is useful when you need to collect the data during rendering, like [styled-components](https://www.styled-components.com/docs/advanced#server-side-rendering) or [react-loadable](https://github.com/jamiebuilds/react-loadable#finding-out-which-dynamic-modules-were-rendered). See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#gettemplatedatadata-pipe-server-only) for more details.

#### `getServerData(req, res): serverData` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel))

In some cases you need to share data from the server-side to the client-side (for example request specific data or derived data). For these circumstances you can implement the `getServerData()` hook (which will get passed the Express `request` and `response` objects) and return an object of key/value pairs that you want to make accessible on the client-side via the [above mentioned HoC](#withserverdatacomponent-higherordercomponent") or [Context consumer](#serverdatacontextconsumerdata---render-something-serverdatacontextconsumer).
