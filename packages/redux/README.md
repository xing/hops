# `hops-redux`

[![npm](https://img.shields.io/npm/v/hops-redux.svg)](https://www.npmjs.com/package/hops-redux)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that can be used to add redux support to your Hops project.

### Installation

_This preset must be used together with the `hops-react` preset._

Add this preset and its peer dependencies `react-redux`, `redux` and `redux-thunk` to your existing Hops React project:

```bash
npm install --save hops-redux react-redux redux redux-thunk
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

### Usage

In order to use Redux in your application install the plugin and configure your reducers [via render options](#render-options).

Check out this [integration test](https://github.com/xing/hops/tree/master/packages/spec/integration/redux) as an example for how to use this preset.

### Configuration

#### Preset Options

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `shouldPrefetchOnServer` | `Boolean` | `true` | _no_ | Whether Hops should execute route-bound action creators during server-side rendering **[deprecated]** |
| `allowServerSideDataFetching` | `Boolean` | `true` | _no_ | Whether Hops is allowed to execute route-bound action creators during server-side rendering |

##### `shouldPrefetchOnServer` [deprecated]

**Note:** This option has been deprecated. See the [DEPRECATIONS document](https://github.com/xing/hops/blob/master/DEPRECATIONS.md#DEP0003) for more informations.

Whether you want "full server-side rendering" or just "app shell" rendering.

This option controls whether you want Hops to execute the configured [route-bound `actionCreators`](#actioncreators) during server-side rendering, so that your components will get rendered with actual data and the redux store will be dehydrated/rehydrated between server and client.

```json
"hops": {
  "shouldPrefetchOnServer": false
}
```

##### `allowServerSideDataFetching`

If you don't want Hops to execute route-bound action creators during server-side rendering, set this value to `false`.

Bear in mind, that setting this value to `true` on the other hand has no mandatory character. This means that there's no way to force Hops to execute server-side requests. As soon as there's a single Hops preset in place, that either sets the `allowServerSideDataFetching`-value to `false` or implements the [`canPrefetchOnServer`](https://github.com/xing/hops/tree/master/packages/redux#canprefetchonserver-boolean-sequence-server)-hook to return `false`, there won't be any server-side requests.

#### Render Options

This preset has only a single runtime option which can be passed to the `render()` options inside the `redux` key (see example above).

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `redux.reducers` | `Object` | `{}` | _yes_ | An object [whose values](https://redux.js.org/api-reference/combinereducers#arguments) consists of all your reducer functions. |
| `redux.middlewares` | `Array` | `[ReduxThunkMiddleware]` | _no_ | An array of all [redux middleware](https://redux.js.org/api-reference/applymiddleware) you want to use. |
| `redux.actionCreators` | `Array` | `[]` | _no_ | An array of route-bound action creators to be dispatched when the current route matches. |
| `redux.alwaysDispatchActionsOnClient` | `boolean` | `undefined` | _no_ | When using server side rendering the route-matching actions will be dispatched on the server only - pass `true` to also dispatch these actions on the client again. |

##### `reducers`

An object with key/value pairs of namespaces and reducer functions which will shape your state tree. This will be used with the [`combineReducers` function](https://redux.js.org/api-reference/combinereducers#arguments).

```javascript
const reducers = {
  counter: function(state, action) {
    return action.type === 'increment' ? state + action.payload : state;
  },
};
export default render(<MyApp />, { redux: { reducers } });
```

##### `middlewares`

You can configure any redux middleware you may want to use - by default this preset will include the [`redux-thunk` middleware](https://github.com/reduxjs/redux-thunk).

```javascript
import logger from 'redux-logger';
import thunk from 'redux-thunk';
export default render(<MyApp />, { redux: { middlewares: [logger, thunk] } });
```

##### `actionCreators`

In order to dispatch actions based on the currently matching route you can specify a list of actions for [matching urls](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/matchPath.md).

These objects have the same properties as the [`<Route />` component](https://reacttraining.com/react-router/core/api/Route/path-string) and an additional `action` key with which the action that is to be dispatched can be specified.

When server-side rendering/data fetching is enabled, this will dispatch matching actions on the server and prefill the store for client-side.

On the client-side by default this will dispatch matching actions only on client-side navigation (can be overriden by setting `alwaysDispatchActionsOnClient` to `true`).

Actions receive two parameters: `params` (see [URL Parameters](https://reacttraining.com/react-router/web/example/url-params) in the react-router docs) and an object containing `location` (the react router [`location`](https://reacttraining.com/react-router/web/api/location) object) and [`match`]((https://reacttraining.com/react-router/web/api/match).

```javascript
export default render(<MyApp />, {
  redux: {
    actionCreators: [
      {
        path: '/users',
        exact: true,
        strict: true,
        action: fetchUsers,
      },
      {
        path: '/users/:id',
        action: ({ id }) => fetchUser(id),
      },
    ],
  },
});
```

##### `alwaysDispatchActionsOnClient`

Use this option to control whether you want to dispatch [matching actions](#actioncreators) on the client-side again after they have already been dispatched on the server.

```javascript
export default render(<MyApp />, {
  redux: {
    actionCreators: [...],
    alwaysDispatchActionsOnClient: true,
  },
});
```

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

#### `getReduxStore(): Store` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Use this method in your own mixins to get a reference to the currently used Redux [Store](https://redux.js.org/api-reference/store) instance.

#### `getReduxMiddlewares(): [middleware]` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Allows to specify your own set of redux middlewares. Useful when middlewares need access to the current request object, which only exists in the mixin context. Passes fetch implementation as extra argument to thunks.

Beware that middlewares passed as render option take precedence.

##### Example thunk-based action creator

```javascript
// Object with fetch is passed as third parameter to thunks
const incrementFetch = () => (dispatch, getState, { fetch }) => {
  return fetch('/api')
    .then(r => r.json())
    .then(({ value }) => {
      dispatch({ type: 'INCREMENT', payload: value });
    });
};
```

#### `canPrefetchOnServer(): boolean` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel)) **server**

This is a hook that can be used to customize the behavior of when Hops can prefetch data during server-side rendering. E.g. execute route-bound action creators during initial render. If any function of this sequence returns false it prevents server fetching for this request.

By default it returns whatever is configured in the [`allowServerSideDataFetching` preset option](#allowServerSideDataFetching).

In case you need more control over the server-side rendering you can implement this method and provide your own implementation that decides if data should be prefetched during server-side rendering.
