# Hops Redux

[![npm](https://img.shields.io/npm/v/hops-redux.svg)](https://www.npmjs.com/package/hops-redux)

hops-redux extends [hops-react](https://github.com/xing/hops/tree/master/packages/react) by providing a rendering context injecting a [Redux](https://github.com/reactjs/redux) [`Provider`](https://github.com/reactjs/react-redux) and some helpers.

Additionally, hops-redux registers the [Thunk](https://github.com/gaearon/redux-thunk) middleware and supports [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) out of the box.

# Installation

To use hops-redux, you need to add it and its dependencies to an existing project that already has [hops-react](https://github.com/xing/hops/tree/master/packages/react) installed.

```bash
npm install --save hops-redux react react-redux redux redux-thunk
```

# API

## `reduxExtension(config)`

`reduxExtension()` is hops-redux's main export. It is used as an extension to [`hops-react's render function`](https://github.com/xing/hops/tree/master/packages/react#renderreactelement-config). It accepts following options:

| Field       | Type   | Default                  | Description                                                                                                                                                                                                                                |
| ----------- | ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| reducers    | Object | `{}`                     | object literal containing reducers to be passed to Redux's [`combineReducers()`](http://redux.js.org/docs/api/combineReducers.html)                                                                                                        |
| middlewares | Array  | `[ReduxThunkMiddleware]` | array specifying the redux middlewares to apply. Uses [redux-thunk](https://github.com/gaearon/redux-thunk) as default. When middlewares is specified redux-thunk will not be included by default and needs to be added as well if needed. |

## `createContext(options)`

`createContext()` is hops-redux's advanced export. Additional to the config options of [hops-react's createContext](https://github.com/xing/hops/tree/master/packages/react#createcontextoptions) it takes additional `reducers` and `middlewares` as described [above under `reduxExtension(config)`](#createcontextoptions). Be careful, in this case you have to wrap the config options under the `redux` namespace.

```javascript
createContext({
    redux {
      reducers: {
        [namespace]: (state = { message: 'Hello World!' }) => state,
      }
    }
  })
```

## `ReduxContext`

This constructor function is an advanced API feature, meant to help you build your own context factory functions. For more info, please read up on hops-react [render contexts](https://github.com/xing/hops/tree/master/packages/react#render-contexts).

# Example

```js
import React from 'react';
import { connect } from 'react-redux';

import { render } from 'hops-react';
import { reduxExtension } from 'hops-redux';

const namespace = 'foo';

const withMessage = connect(state => state[namespace]);

const App = withMessage(props => <h1>{props.message}</h1>);

export default render(<App />, {
  extensions: [
    reduxExtension({
      reducers: {
        [namespace]: (state = { message: 'Hello World!' }) => state,
      },
    }),
  ],
});
```
