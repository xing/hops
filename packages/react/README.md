# `hops-react`

[![npm](https://img.shields.io/npm/v/hops-react.svg)](https://www.npmjs.com/package/hops-react)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that enables React, JSX, React-Helmet Async and React-Router support in Hops applications.

`hops-react`'s main runtime exports are a couple of React components that allow implementers to declaratively control server (or system) behavior. Additionally, `hops-react` features full support for [`react-router`](https://github.com/ReactTraining/react-router)'s and [`react-helmet-async`](https://github.com/staylor/react-helmet-async)'s components.

`hops-react` provides all three types of `hops-bootstrap` [mixin types](../bootstrap/README.md#mixins). Its `core` mixin uses `hops-webpack`'s [`configureBuild`](../webpack/README.md#configurebuildwebpackconfig-loaderconfigs-target-pipe) hook to add some settings specific to [React](https://reactjs.org), for example support for [JSX](https://reactjs.org/docs/introducing-jsx.html) syntax.

Its `runtime`, i.e. `browser` and `server`, mixins are a bit more interesting as they are `hops-react`'s only default [`render`](../bootstrap/README.md#renderargs-runtime-only) mixins. They set up [React](https://reactjs.org) for client- and server-side rendering. Additionally, they provide mixin hooks of their own to allow you to add your own features, for example [Redux](https://redux.js.org) support.

During application startup, `hops-react` runs a check to determine if certain npm packages are installed multiple times. If you see warnings telling you that this is the case, you will want to make sure you get rid of these duplicates, as they will almost certainly break things in interesting ways.

### Installation

Add this preset and its peer dependencies `react`, `react-dom`, `react-helmet-async` and `react-router-dom` to your existing Hops React project:

```bash
npm install --save hops-react react react-dom react-helmet-async react-router-dom
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### Usage

After installing this preset your main entry file (either referenced via `package.json` `"main"` entry or named as `index.js`) must `default export render(<MyApp />)` from `hops-react`.

```javascript
import { render } from 'hops-react';
import React from 'react';

export default render(<h1>Hello World!</h1>);
```

Check out this [integration test](../spec/integration/react) as an example for how to use this preset.

#### Consumer API

##### `render(element[, options]): UniversalRenderImplementation`

`render()` is `hops-react`'s main export. You are expected to call it in your applications main entry file and it is essentialy a shorthand: it creates and bootstraps a mixin container and calls its `render` method.

`render` accepts two arguments: a react element and an optional options object. `hops-react` will use the contents of `options.router` to configure the [React Router](https://github.com/ReactTraining/react-router) instances it controls.

```javascript
import React from 'react';
import { render } from 'hops-react';
export default render(<h1>hello world</h1>);
```

The `render` function serves two main purposes: 'universalifying' or 'isomorphizing' you application, i.e. making sure your app's code can run both on a server and in a browser, and integrating `hops`'s build and runtime environments.

### `importComponent(module|moduleLoader, [exportName|exportResolver])`

Using the `importComponent` helper, you can asynchronously require components into your application to help you reduce asset sizes. It works similarly to [`react-loadable`](https://github.com/jamiebuilds/react-loadable), but is deeply integrated with `hops` and e.g. supports server-side-rendering.

```javascript
import { importComponent } from 'hops-react';

const Home = importComponent(
  () => import('./home'),
  ({ Home }) => Home
);

export default () => <Home />;
```

If you do not specify an `exportName` or `exportResolver`, `importComponent` will fall back to the imported modules `default` export.

`importComponent` itself returns a React component supporting some props that enable you to control module loading and (placeholder) rendering.

```javascript
import { importComponent } from 'hops-react';

const About = importComponent('./about', 'About');

const loader = (load) =>
  Promise.race([
    new Promise((resolve, reject) => setTimeout(reject, 10000)),
    load(),
  ]);

const render = ({ Component, error, loading, ...props }) => {
  return !(error || loading) ? <Component {...props} /> : null;
};

export default () => <About loader={loader} render={render} />;
```

Components loaded using `importComponent` (and their dependencies) will be placed in separate chunks, i.e. asset files. `hops-react` makes sure that all asset files containing modules used for server-side rendering are referenced in the initial HTML output.

##### `<Header name="String" value="String" />`

With this component, you can declaratively set arbitrary HTTP headers from your React application. On the client side, it is effectively a no-op.

```javascript
import { Header } from 'hops-react';

export default () => <Header name="X-Foo" value="Bar" />;
```

##### `<Miss />`

This component allows you to instruct `hops-react` to call Express.js' [middleware `next`](https://expressjs.com/en/guide/using-middleware.html) function. On the client side, it is effectively a no-op.

```javascript
import { Miss } from 'hops-react';

export default () => <Miss />;
```

Place this side-effect component after the last `<Route />` in your React Router's `<Switch />` component to signal the server that it should respond with a `404` status code.

##### `<Status code={Number} />`

This component enables you to instruct `hops-react` to send a different HTTP status code than the default of 200. On the client side, it is effectively a no-op.

```javascript
import { Status } from 'hops-react';

export default () => <Status code={404} />;
```

##### `withServerData(Component): HigherOrderComponent`

Wrap your component with this HoC to get access to the prop `serverData` which contains all values of mixins that have implemented the `enhanceServerData` hook.

##### `useServerData(): ServerData`

React hook for accessing the `serverData`-property from inside a functional component.

##### `<ServerDataContext.Consumer>{data => /* render something */}</ServerDataContext.Consumer>`

If you don't want to use the above mentioned HoC or React hook you can also use this React Context consumer instead. It will accept a function as a child component and pass the `serverData` object to it. You can also use `ServerDataContext` as [`contextType`](https://reactjs.org/docs/context.html#classcontexttype) or in the [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) React hook.

##### `withConfig(Component): HigherOrderComponent`

Wrap your component with this HoC to get access to the prop `config` which contains all [settings](../../DOCUMENTATION.md#settings).

##### `useConfig(): Config`

React hook for accessing the `config`-property from inside a functional component.

##### `<ConfigContext.Consumer>{data => /* render something */}</ConfigContext.Consumer>`

If you don't want to use the above mentioned HoC or React hook you can also use this React Context consumer instead. It will accept a function as a child component and pass the `config` object to it. You can also use `ConfigContext` as [`contextType`](https://reactjs.org/docs/context.html#classcontexttype) or in the [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) React hook.

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

#### `render([req, res, next]): void` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

This method is being called whenever you call the main `render` method. In a server-side, i.e. Node.js, environment it receives the usual arguments any Express [middleware](https://expressjs.com/en/guide/writing-middleware.html) receives: `req`, `res`, and `next`. In a client-side, i.e. browser, environment it receives no arguments whatsoever.

```javascript
const { Mixin } = require('hops');

module.exports = class FooMixin extends Mixin {
  render(req, res, next) {
    if (req) {
      // server
    } else {
      // browser
    }
  }
};
```

You will not usually have to override this method as it exposes the following mixin hooks to alter its behaviour. In a server-side environment, a fresh `mixinable` container is being created for every request, including new mixin instances.

#### `bootstrap([req, res]): void` ([parallel](https://github.com/untool/mixinable/blob/master/README.md#defineparallel)) **runtime/browser/server**

Within this method, you are expected to set up your application. Your implementation will receive both Express' [`req`](https://expressjs.com/en/4x/api.html#req) and [`res`](https://expressjs.com/en/4x/api.html#res) objects for you to do whatever you like with. If you need to do something asynchronous in this method, just return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```javascript
const { Mixin } = require('hops');

module.exports = class FooMixin extends Mixin {
  bootstrap(req, res) {
    if (req) {
      // server
    } else {
      // browser
    }
  }
};
```

Remember you can register custom middlewares using [`hops-express`](../express/README.md#initializeserverapp-target-sequence) instead of implementing elaborate request or response handling logic inside your runtime mixin.

#### `enhanceElement(element): element` ([compose](https://github.com/untool/mixinable/blob/master/README.md#definecompose)) **runtime/browser/server**

With this method, you can wrap the React root element with additional components, like Redux' [Provider](https://redux.js.org/basics/usage-with-react). If you need to do something asynchronous in this method, just return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolving to the wrapped element.

```javascript
const { Mixin } = require('hops');

module.exports = class FooMixin extends Mixin {
  enhanceElement(element) {
    return element;
  }
};
```

#### `fetchData(data, element): data` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **runtime/browser/server**

Most applications need some sort of data. Implement this method in your mixin, to fetch said data before rendering and return an object with that additional data. If you need to do something asynchronous in this method, just return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolving to the data.

```javascript
const { Mixin } = require('hops');

module.exports = class FooMixin extends Mixin {
  fetchData(data, element) {
    return { ...data, foo: 'bar' };
  }
};
```

#### `getTemplateData(data): data` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **server**

In case you need to gather additional template data after React rendering, e.g. if you are using [styled components](https://www.styled-components.com), you can add the required data by implementing this hook in your custom mixin. To do so asynchronously, have this method return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolving to the extended data.

```javascript
const { Mixin } = require('hops');

module.exports = class FooMixin extends Mixin {
  getTemplateData(data) {
    return { ...data, baz: 'qux' };
  }
};
```

This hook is only used for server-side rendering, i.e. it will not be called in the browser.

#### `enhanceServerData(serverData, req, res): serverData` ([pipe](https://github.com/untool/mixinable/blob/master/README.md#definepipe)) **server**

In some cases you need to share data from the server-side to the client-side (for example request specific data or derived data). For these circumstances you can implement the `enhanceServerData()` hook (which will get passed the previous `serverData` object and Express `request` and `response` objects) and add your key/value pairs that you want to make accessible on the client-side via the [above mentioned HoC](#withserverdatacomponent-higherordercomponent) or [Context consumer](#serverdatacontextconsumerdata---render-something-serverdatacontextconsumer).

#### `getServerData(): serverData` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Returns the `serverData` produced by `enhanceServerData` on server and client.
