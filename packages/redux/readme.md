# Hops Redux

hops-redux extends [hops-react](https://github.com/xing/hops/tree/master/packages/react) by providing a rendering context injecting a Redux `Provider` and some helpers.

Additionally, hops-redux registers the [redux-thunk](https://github.com/gaearon/redux-thunk) middleware and supports [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) out of the box.

# Installation
``` bash
npm install --save hops-redux react-redux redux redux-thunk
```

# API
## `createContext(options)`
`createContext()` is hops-redux's main export. Of course, it is based on the implementation in [hops-react](https://github.com/xing/hops/tree/update-readmes/packages/react#contextoptions), but takes an additional `reducers` option.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| mountpoint | String | '#main' | querySelector identifying the root DOM node |
| template | Function | defaultTemplate | template function supporting all React Helmet and hops-react features |
| reducers | Object | {} | object literal containing reducers to be passed to Redux's [`combineReducers()`](http://redux.js.org/docs/api/combineReducers.html) |

## `Context(options)`
`Context()` works the same way as `createContext()`, but with an object-oriented API. Additionally, you can use its [`Context.extend()`](https://github.com/xing/hops/tree/update-readmes/packages/react#contextoptions) method to build upon hops-redux and create advanced context implementations.

# Example

``` js
import React from 'react';
import { connect } from 'react-redux';

import { render } from 'hops-react';
import { createContext } from 'hops-redux';

const namespace = 'foo';

const withMessage = connect(state => state[namespace]);

const App = withMessage(props => (<h1>{ props.message }</h1>));

export default render(<App />, createContext({
  reducers: {
    [namespace]: (state = { message: 'Hello World!' }) => state
  }
}));
```
