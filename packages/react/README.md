# Hops React

[![npm](https://img.shields.io/npm/v/hops-react.svg)](https://www.npmjs.com/package/hops-react)

hops-react works in tandem with [hops-build](https://github.com/xing/hops/blob/master/packages/build) and [hops-config](https://github.com/xing/hops/blob/master/packages/config) to make an integrated solution for universal ("isomorphic") rendering using React. It provides a minimal API and hides the tricky bits of setting up React for such use-cases.

Out of the box, hops-react additionally supports [React Router](https://github.com/ReactTraining/react-router) and [React Helmet](https://github.com/nfl/react-helmet).

# Installation

```bash
npm install --save react react-dom react-helmet react-router react-router-dom hops-react hops-config
```

# Basic API

## `render(reactElement, context)`

`render()` is the main hops-react API. Its return value differs depending on the environment: in a browser context, it returns a plain function handling mounting of the app and hot module replacement. In a Node.js context, it returns an Express style middleware function. In both cases, its return value is meant to be the default export of your application's main entry file.

`render()` accepts two arguments: `reactElement`, your React application's root element, and `context`, an optional hops-react rendering context instance.

```js
import React from 'react';
import { render, createContext } from 'hops-react';

const App = () => <h1>Hello World!</h1>;

export default render(<App />, createContext());
```

## `render(reactElement, config)`

Simple wrapper for [`render(reactElement, context)`](#renderreactelement-context) shielding the details of context from you. Each package that functions as an optional extension to the core react package offers a so called `extension` which you can pass as an array. Unlike [`React#createContext(options)`](#createcontextoptions) each extension only takes a configuration that is specific to it, not a general one.

Here you have an example of a React application using the Redux extension. The Redux extension takes only the specific set of options (not the general React ones) mentioned in [`Redux#createContext(options)`](../redux/README.md#createcontextoptions). The general options are passed directly in the configuration.

```js
import React from 'react';
import { render } from 'hops-react';
import { reduxExtension } from 'hops-redux';

const App = () => <h1>Hello World!</h1>;

export default render(<App />, {
  mountpoint: '#main',
  extensions: [reduxExtension({ reducers })],
});
```

## `createContext(options)`

`createContext()` generates a rendering context containing most of the actual implementation used by `render`. It takes a couple of options:

| Field      | Type     | Default                                                                                    | Description                                                                                                                                                                                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mountpoint | String   | '#main'                                                                                    | querySelector identifying the root DOM node                                                                                                                                                                                                     |
| template   | Function | [defaultTemplate](https://github.com/xing/hops/blob/master/packages/react/lib/template.js) | template function supporting all relevant React Helmet and hops-react features                                                                                                                                                                  |
| router     | Object   | {}                                                                                         | props to be passed to one of the relevant ReactRouter implementations: [`<StaticRouter />`](https://reacttraining.com/react-router/web/api/StaticRouter) or [`<BrowserRouter />`](https://reacttraining.com/react-router/web/api/BrowserRouter) |

## `<Miss />`, `<Status code={200} />` and `<Header name="x-foo" value="bar" />`

To declaratively control server behavior from your application, you can use the React components provided by hops-react. Neither of these components produces any html output, they are effectively no-ops if used in the browser.

On the server, however, `<Miss />` makes sure Express' `next()` middleware function is being called, signalling Express that your application is not responsible for handling the current request. `<Status />`, however controls the HTTP status code returned by the server.

`<Header />` allows to set abritraty http headers for each request. Elements rendered more deeply will override those included higher up in the rendered tree. Adding the same header (such as `Set-Cookie`) multiple times can be achieved by providing an array as value. `<Header name="x-foo" value={['bar', 'baz']}/>` If a function is passed as `value`, it will be called with the headers that have already been set and the return value is used as header value.

# Basic Example

```js
import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { render, createContext, Miss } from 'hops-react';

import { headline } from './styles.css';
import { template } from './template.tpl';

const Home = () => (
  <div>
    <Helmet>
      <title>Example</title>
    </Helmet>
    <h1 className={headline}>Hello World!</h1>
  </div>
);

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />, createContext({ template }));
```

# Render Contexts

Most of `hops-react`'s functionality is implemented in a render context. You can either use one of the `createContext` factory functions provided by hops-react, hops-redux and hops-graphql or you can provide your own implementation. You can even mix-and-match default and custom context definitions.

`hops-react` does not use conventional JavaScript inheritance for its render contexts, but rather relies on [mixinable](https://github.com/dmbch/mixinable) to provide a form of [multiple inheritance](https://en.wikipedia.org/wiki/Multiple_inheritance).

## Composition API

### `combineContexts(...contextDefinition)`

Calling `combineContexts` with one or more `contextDefinition`s creates a context factory function similar to the `createContext` function described above.

`contextDefinition`s can be constructor functions or prototype objects. Both are being used behind the scenes to instantiate specialized sub-contexts. All their methods that do not implement lifecycle hooks (see below) are private, as sub-context instances are hidden.

The sub-context instances are completely isolated and they cannot interfere with one another. Objects created with a `createContext` factory are essentially facades

### `ReactContext`

hops-react exports its basic context definition as a constructor function to allow simple sub-classing and composition using `combineContexts`. For example, by `extend`ing it and overriding its `enhanceElement` method, you can very easily provide your own ReactRouter setup.

## Lifecycle API

### `bootstrap()`

The `bootstrap` lifecyle hook allows you to set up your application and perform data fetching or other asynchronous operations. You are expected to return a `Promise` - and the `bootstrap` operations from all active `contextDefinition`s are performed in parallel. Rendering is blocked until all `Promise`s have been resolved (or rejected).

### `enhanceElement(reactElement)`

By implementing `enhanceElement`, you can wrap your application's root element in additional, usually purely functional components such as Redux's or React-Intl's `Provider`s. This way, you can keep the low-level (plumbing) parts of your application nicely separated from the high-level (porcellain) parts.

### `getTemplateData(templateData)` (Node.js only)

`getTemplateData` is supposed to return an object that is being passed to the server-side template function. Please check out hops-react's default template to get an idea on what keys are supported.

`templateData` are being piped through the different implementations: make sure to extend or modify the object that is being passed into your implementation.

### `renderTemplate(templateData)` (Node.js only)

`renderTemplate` is expected to be a rather simple, synchronous template function: data in, HTML string out. If you want to provide your own implementation, you might want to remember that hops-build-config allows you to simply `require`/`import` [template files](https://github.com/xing/hops/tree/master/packages/build-config#filesassets).

### `getMountpoint()` (Browser only)

`getMountpoint` is meant to synchronously return the DOM-node your application is supposed to be mounted into.
