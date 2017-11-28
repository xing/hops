# Hops Redux

[![npm](https://img.shields.io/npm/v/hops-redux.svg)](https://www.npmjs.com/package/hops-redux)

hops-redux extends
[hops-react](https://github.com/xing/hops/tree/master/packages/react) by
providing a rendering context injecting a
[Redux](https://github.com/reactjs/redux)
[`Provider`](https://github.com/reactjs/react-redux) and some helpers.

Additionally, hops-redux registers the
[Thunk](https://github.com/gaearon/redux-thunk) middleware and supports
[Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) out of
the box.

# Installation

To use hops-redux, you need to add it and its dependencies to an existing
project that already has
[hops-react](https://github.com/xing/hops/tree/master/packages/react) installed.

```bash
npm install --save hops-redux react react-redux redux redux-thunk
```

# API

## `createContext(options)`

`createContext()` is hops-redux's main export. Of course, it is based on the
implementation in
[hops-react](https://github.com/xing/hops/tree/master/packages/react#createcontextoptions),
but takes an additional `reducers` option.

| Field       | Type     | Default                  | Description                                                                                                                                                                                                                                |
| ----------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mountpoint  | String   | `'#main'`                | querySelector identifying the root DOM node                                                                                                                                                                                                |
| template    | Function | `defaultTemplate`        | template function supporting all React Helmet and hops-react features                                                                                                                                                                      |
| reducers    | Object   | `{}`                     | object literal containing reducers to be passed to Redux's [`combineReducers()`](http://redux.js.org/docs/api/combineReducers.html)                                                                                                        |
| middlewares | Array    | `[ReduxThunkMiddleware]` | array specifying the redux middlewares to apply. Uses [redux-thunk](https://github.com/gaearon/redux-thunk) as default. When middlewares is specified redux-thunk will not be included by default and needs to be added as well if needed. |

# Example

```js
import React from 'react';
import { connect } from 'react-redux';

import { render } from 'hops-react';
import { createContext } from 'hops-redux';

const namespace = 'foo';

const withMessage = connect(state => state[namespace]);

const App = withMessage(props => <h1>{props.message}</h1>);

export default render(
  <App />,
  createContext({
    reducers: {
      [namespace]: (state = { message: 'Hello World!' }) => state
    }
  })
);
```
