# `hops-react`

[![npm](https://img.shields.io/npm/v/hops-react.svg)](https://www.npmjs.com/package/hops-react)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that enables React, JSX, React-Helmet and React-Router support in Hops applications.

### Installation

Add this preset and its peer dependencies `react`, `react-dom`, `react-helmet` and `react-router-dom` to your existing Hops React project:

```bash
npm install --save hops-react react react-dom react-helmet react-router-dom
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

### Usage

After installing this preset your main entry file (either referenced via `package.json` `"main"` entry or named as `index.js`) must `default export render(<MyApp />)` from `hops-react`.

```javascript
import { render } from 'hops-react';
import React from 'react';

export default render(<h1>Hello World!</h1>);
```

Check out this [integration test](https://github.com/xing/hops/tree/master/packages/spec/integration/react) as an example for how to use this preset.

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

Wrap your component with this HoC to get access to the prop `serverData` which contains all values of mixins that have implemented the `enhanceServerData` hook.

##### `<ServerDataContext.Consumer>{data => /* render something */}</ServerDataContext.Consumer>`

If you don't want to use the above mentioned HoC you can also use this React Context consumer instead. It will accept a function as a child component and pass the `serverData` object to it. You can also use `ServerDataContext` as [`contextType`](https://reactjs.org/docs/context.html#classcontexttype) or in [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) hook.

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

#### `render([req, res, next]): void` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

This is the default React universal render method which exposes the following hooks. You will usually not have to override this. See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#renderreq-res-next-override) for more details.

#### `bootstrap([req, res]): void` ([parallel](https://github.com/untool/mixinable/blob/master/README.md#defineparallel)) **runtime/browser/server**

You can implement this method to run tasks before any rendering occurs to bootstrap your application. See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#bootstrapreq-res-parallel) for more details.

#### `enhanceElement(element): element` ([compose](https://github.com/untool/mixinable/blob/master/README.md#definecompose)) **runtime/browser/server**

Implement this method to wrap your application component tree with additional components. Like a `<Provider />` for Redux or some custom `<ContextProvider />` when using [React Context](https://reactjs.org/docs/context.html). See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#enhanceelementelement-compose) for more details.

#### `fetchData(data, element): data` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **runtime/browser/server**

Implement this method to fetch additional data before React's `renderToString()` method is called. See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#fetchdatadata-element-pipe) for more details.

#### `getTemplateData(data): data` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **server**

Implement this method to modify the `data` object after React's rendering has occured. This is useful when you need to collect the data during rendering, like [styled-components](https://www.styled-components.com/docs/advanced#server-side-rendering) or [react-loadable](https://github.com/jamiebuilds/react-loadable#finding-out-which-dynamic-modules-were-rendered). See [`@untool/react`](https://github.com/untool/untool/tree/master/packages/react#gettemplatedatadata-pipe-server-only) for more details.

#### `enhanceServerData(serverData, req, res): serverData` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **server**

In some cases you need to share data from the server-side to the client-side (for example request specific data or derived data). For these circumstances you can implement the `enhanceServerData()` hook (which will get passed the previous `serverData` object and Express `request` and `response` objects) and add your key/value pairs that you want to make accessible on the client-side via the [above mentioned HoC](#withserverdatacomponent-higherordercomponent") or [Context consumer](#serverdatacontextconsumerdata---render-something-serverdatacontextconsumer).

#### `getServerData(): serverData` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Returns the `serverData` produced by `enhanceServerData` on server and client.
