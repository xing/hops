# Hops React

[![npm](https://img.shields.io/npm/v/hops-react.svg)](https://www.npmjs.com/package/hops-react)

hops-react works in tandem with [hops-build](https://github.com/xing/hops/blob/master/packages/build) and [hops-config](https://github.com/xing/hops/blob/master/packages/config) to make an integrated solution for universal ("isomorphic") rendering using React. It provides a minimal API and hides the tricky bits of setting up React for such use-cases.

Out of the box, hops-react additionally supports [React Router](https://github.com/ReactTraining/react-router) and [React Helmet](https://github.com/nfl/react-helmet).

# Installation

```bash
npm install --save react react-dom react-helmet react-router react-router-dom hops-react hops-config
```

# API

## `render(reactElement, context)`

`render()` is the main hops-react API. Its return value differs depending on the environment: in a browser context, it returns a plain function handling mounting of the app and hot module replacement. In a Node.js context, it returns an Express style middleware function. In both cases, its return value is meant to be the default export of your application's main entry file.

`render()` accepts two arguments: `reactElement`, your React application's root element, and `context`, an optional hops-react rendering context instance.

```js
import React from 'react';
import { render } from 'hops-react';

const App = () => <h1>Hello World!</h1>;

export default render(<App />);
```

If you pass an object literal instead of a context instance, `render()` itself creates a context using said object as options.

## `createContext(options)`

`createContext()` generates a rendering context containing most of the actual implementation used by `render`. It takes a couple of options:

| Field      | Type     | Default                                                                                    | Description                                                                    |
| ---------- | -------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| mountpoint | String   | '#main'                                                                                    | querySelector identifying the root DOM node                                    |
| template   | Function | [defaultTemplate](https://github.com/xing/hops/blob/master/packages/react/lib/template.js) | template function supporting all relevant React Helmet and hops-react features |

## `<Miss />` and `<Status code={200} />`

To declaratively control server behavior from your application, you can use two React components provided by hops-react. Neither of these components produces any html output, both are effectively no-ops if used in the browser.

On the server, however, `<Miss />` makes sure Express' `next()` middleware function is being called, signalling Express that your application is not responsible for handling the current request. `<Status />`, however controls the HTTP status code returned by the server.

# Full Example

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
