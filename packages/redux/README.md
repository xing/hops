# `hops-redux`

[![npm](https://img.shields.io/npm/v/hops-redux.svg)](https://www.npmjs.com/package/hops-redux)

[//]: # 'TODO: add general section about presets, how to install them, how to register them, how to configure them to main Hops readme'

This is a [preset for Hops](https://missing-link-explain-what-are-presets) that can be used to add redux support to your Hops project.

### Installation

_This preset must be used together with the `hops-react` preset._

Just add this preset and its peer dependencies `react-redux`, `redux` and `redux-thunk` to your existing Hops React project:

```bash
$ yarn add hops-redux react-redux redux redux-thunk
# OR npm install --save hops-redux react-redux redux redux-thunk
```

[//]: # 'TODO: add general section about setting up a basic hops project to main Hops readme'

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://missing-link-explain-quick-start)

### Usage

In order to use Redux in your application install the plugin and configure your reducers as [as render option](#render-options).

Check out this [integration test](https://github.com/xing/hops/tree/next/packages/spec/integration/redux) as an example for how to use this preset.

### Configuration

[//]: # 'TODO: link to hops-react render method once readme is completed'

This preset can be configured via the `options` hash passed to [hops-react's render() method](https://missing-link-explain-hops-react-render):

```javascript
const reducers = {
  counter: function(state, action) {
    return action.type === 'increment' ? state + action.payload : state;
  },
};
export default render(<MyApp />, { redux: { reducers } });
```

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has only a single runtime option which can be passed to the `render()` options inside the `redux` key (see example above).

| Name                            | Type      | Default                  | Required | Description                                                                                                                                                         |
| ------------------------------- | --------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reducers`                      | `Object`  | `{}`                     | _yes_    | An object [whose values](https://redux.js.org/api-reference/combinereducers#arguments) consists of all your reducer functions.                                      |
| `middlewares`                   | `Array`   | `[ReduxThunkMiddleware]` | _no_     | An array of all [redux middleware](https://redux.js.org/api-reference/applymiddleware) you want to use.                                                             |
| `actionCreators`                | `Array`   | `[]`                     | _no_     | An array of route-bound action creators to be dispatched when the current route matches.                                                                            |
| `alwaysDispatchActionsOnClient` | `boolean` | `undefined`              | _no_     | When using server side rendering the route-matching actions will be dispatched on the server only - pass `true` to also dispatch these actions on the client again. |

### API

#### `getReduxStore(): Store` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride))

Use this method in your own mixins to get a reference to the currently used Redux [Store](https://redux.js.org/api-reference/store) instance.
