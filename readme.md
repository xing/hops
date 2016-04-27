
<p align="center">
  <img
    width="200"
    height="217"
    src="https://github.com/xing/hops/blob/master/logo.png?raw=true"
  />
</p>

<h1 align="center">Hops UI Toolbox</h1>

<p align="center">
  <a href="https://travis-ci.org/xing/hops">
    <img src="https://travis-ci.org/xing/hops.svg?branch=master">
  </a>
  <a href="https://david-dm.org/xing/hops">
    <img src="https://david-dm.org/xing/hops.svg">
  </a>
</p>
<p>&nbsp;</p>

In this repo, we are experimenting with technology that might serve as our next generation front end technology stack: hops spices our brew (i.e. web front end) with [ECMAScript](https://babeljs.io) and [Flow](http://flowtype.org), [CSS Next](http://cssnext.io) and [CSS Modules](https://github.com/css-modules/css-modules), [JSX](https://facebook.github.io/jsx/)/[React](https://facebook.github.io/react/) and [Flux](https://facebook.github.io/flux/)/[Redux](http://redux.js.org). To get an impression take a look at our [example app](https://github.com/xing/hops/tree/master/app).

Hops is not yet another boilerplate. Hops is a self-contained but highly extensible development and build environment that is packaged as a single module. Batteries included.

### Install

Besides recent versions of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com), hops has no global dependencies. If you need those, we recommend using [nvm](https://github.com/creationix/nvm) or similar.

```
mkdir foo && cd foo
npm init -y
npm install -SE hops
```

A postinstall script will attempt to bootstrap and configure the project hops is being installed to: after installation, you can instantly start developing.

### Run

For developing with hops, you can use any decent editor with up-to-date language support. Those without a favorite we recommend [Atom](https://atom.io) with the [linter](https://atom.io/packages/linter), [linter-eslint](https://atom.io/packages/linter-eslint) and [linter-stylelint](https://atom.io/packages/linter-stylelint) plugins.

```
npm start (--production)
```

If called without the `--production` flag, a development server with hot module replacement is started. In production mode, a static build is initialized.

### API

#### render(options)

`render()` is hops main function: it creates a [Redux](https://github.com/reactjs/redux) store, sets up [React Router](https://github.com/reactjs/react-router) and handles rendering both client- and server-side. Using it is mandatory and its output must be the default export of your main module. And it's a little magic.

```javascript
import { render } from 'hops';

import { reducers } from './reducers';
import { routes } from './routes';

export default render({ routes, reducers });
```

In addition to `routes` and `reducers`, an html `mountPoint` selector and a `createStore` factory function may be passed as options.


#### createFetchAction(key[, url[, options]])

`createFetchAction()` basically allows you to map a json api url to a specific slice of your application's state. It uses the [Fetch API ](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) under the hood.

```javascript
import { createFetchAction } from 'hops';

const fetch = createFetchAction('foo', 'https://example.com/foo');

dispatch(fetch());
```

Both `createFetchAction()` and the action creator function it returns accept `options` arguments that are merged and passed straight on to `fetch()`.


#### createAction(key)

`createAction()` is just a small helper function to work with reducers generated with `createReducer()`. It is being used internally by `createFetchAction()`.

```javascript
import { createAction } from 'hops';

const update = createAction('foo');

dispatch(update({'bar': {'$set': 'baz'}}));
```


#### createReducer(key)

`createReducer()` generates a [Redux](https://github.com/reactjs/redux) reducer function using the provided key and React's [immutability helpers](https://facebook.github.io/react/docs/update.html).

```javascript
import { createReducer } from 'hops';

export const reducers = { foo: createReducer('foo')};
```

Hops supports server-side data fetching for route components: it calls their static `fetchData` methods and expects them to return promises. Of course, asynchronous actions are supported by using [thunks](https://github.com/gaearon/redux-thunk).


### Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
