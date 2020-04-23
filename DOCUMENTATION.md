<p align="center">
  <img
    width="200"
    height="217"
    src="https://raw.githubusercontent.com/wiki/xing/hops/logo.png"
  />
</p>

<h1 align="center">Hops Documentation</h1>

## Introduction

Hops is everything you need to develop and deploy a production grade universal web application with [React](https://facebook.github.io/react/). It provides both a **universal runtime** as well as the necessary **build tooling**.

Hops targets beginners and experts alike and follows React mainstream best practices.

The two guiding principles are:

1.  Hops scales with your requirements, from an easy start up to large scale applications with many teams
2.  Hops fits a broad need by being modular and extensible, it comes with reasonable defaults, but allows you to customize, configure, and extend almost everything when needed

These are the main features:

- Server-side rendering for fast initial page views, SEO and social sharing previews
- Universal JavaScript (the same code runs in both the server and the client)
- Server- and client-side HMR (Hot Module Reloading) - no more restarting the server after editing your application files
- Environment variable support at runtime (to be able to use a single build artifact for different environments)
- Export your pages as static HTML files [[**deprecated**]](https://github.com/untool/untool/blob/master/DEPRECATIONS.md#dep003)
- ES2018+ & JSX support (All new language features are supported - and, if required, automatically polyfilled - via babel-preset-env)
- Bundle Splitting (with support for server-side rendering)
- Curated list of presets (for data fetching, styling, deployment, etc)
- Sane defaults & fully customizable

## Table of contents

- [System requirements](#system-requirements)
- [Quick start](#quick-start)
- [Walk-through](#walk-through)
  - [Entry files and `hops`'s `render()` function](#entry-files-and-hopss-render-function)
  - [Routing and `hops`'s `<Miss />` component](#routing-and-hopss-miss--component)
  - [Styling Hops applications with `hops-postcss`](#styling-hops-applications-with-hops-postcss)
  - [Code-splitting and `hops`s `importComponent()` function](#code-splitting-and-hopss-importcomponent-function)
  - [CLI / npm scripts](#cli--npm-scripts)
- [Configuration](#configuration)
  - [Settings](#settings)
    - [Default settings](#default-settings)
    - [Placeholders](#placeholders)
    - [Environment variables](#environment-variables)
    - [Exposing values to the client](#exposing-values-to-the-client)
  - [Options](#options)
- [Presets](#presets)
  - [Installing presets](#installing-presets)
  - [Activating presets](#activating-presets)
  - [Available presets](#available-presets)
    - [hops](#hops)
    - [hops-redux](#hops-redux)
    - [hops-react-apollo](#hops-react-apollo)
    - [hops-apollo-mock-server](#hops-apollo-mock-server)
    - [hops-postcss](#hops-postcss)
    - [hops-styled-components](#hops-styled-components)
    - [hops-typescript](#hops-typescript)
    - [hops-pwa](#hops-pwa)
    - [hops-development-proxy](#hops-development-proxy)
    - [hops-lambda](#hops-lambda)
    - [jest-preset-hops](#jest-preset-hops)
- [Advanced configuration and extension](#advanced-configuration-and-extension)
  - [Debugging](#debugging)
  - [Mixins](#mixins)
  - [Creating your first core mixin](#creating-your-first-core-mixin)
  - [Configuring webpack (and babel) through a core mixin](#configuring-webpack-and-babel-through-a-core-mixin)
  - [Configuring Express.js through a core mixin](#configuring-expressjs-through-a-core-mixin)
  - [Configuring rendering through runtime mixins](#configuring-rendering-through-runtime-mixins)
  - [Presets](#presets-1)
- [Contributing](#contributing)
- [Thanks!](#thanks)

## System requirements

Hops is built on modern technologies and therefore needs at least Node.js _v10.13_ or higher.

You can use either [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) (which is included in npm v5.2+) or [`npm init`](https://docs.npmjs.com/cli/init) (with npm v6+) or [`yarn create`](https://yarnpkg.com/lang/en/docs/cli/create/) to create a Hops application and run Hops CLI commands.

## Quick start

To create a new Hops application run the following in a terminal:

```shell
npx create-hops-app my-hops-app
```

_Note: If you prefer to use `yarn`, you can substitute the above command with `yarn create hops-app my-hops-app`._

Then move into the newly created directory:

```shell
cd my-hops-app
```

And start the development server:

```shell
npm start
```

This will start Hops in development mode. Visit [http://localhost:8080](http://localhost:8080) to see your app in the browser and make some changes to the code in your editor to see it live-reloading.

## Walk-through

### Entry files and `hops`'s `render()` function

Hops assumes your entry file is either named `index.js` or is specified via the [`"main"` field in your `package.json`](https://docs.npmjs.com/files/package.json#main). This is similar to how Node.js would resolve a package and allows you to place you entry file wherever you like.

**`package.json`**

```json
{
  "main": "./src/app.js"
}
```

The main export of the entry file must be the result of `hops`'s [`render()`](#renderelement-options) function:

**`src/app.js`**

```javascript
import { render } from 'hops';
import React from 'react';

export default render(<h1>Hello World!</h1>);
```

### Routing and `hops`'s `<Miss />` component

Hops ships with [`react-router`](https://reacttraining.com/react-router/web/guides/quick-start) in order to render different components per route. Additionally Hops provides some helper components, such as `<Miss />` which will tell the server that no matching route has been found (this usually means that Express.js answers with a 404 status code, if no other middleware is registered that handles this request):

**`src/app.js`**

```javascript
import { render, Miss } from 'hops';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

export default render(
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Miss />
  </Switch>
);
```

### Styling Hops applications with `hops-postcss`

In order to style your application with [CSS modules](https://github.com/css-modules/css-modules) and [PostCSS preset env](https://github.com/csstools/postcss-preset-env) we first need to install the auxiliary package `hops-postcss`:

```shell
npm install --save hops-postcss
```

After that we can import `.css` files and use them in our application:

**`src/styles.css`**

```css
.headline {
  color: red;
}
```

And when we now import this file we will have access to all its class names which we can use to style our elements accordingly:

**`src/app.js`**

```javascript
import React from 'react';
import { render } from 'hops';
import styles from './styles.css';

export default render(<h1 className={styles.headline}>Hello World!</h1>);
```

:information_source: In case you want to use CSS Grid, check [the documentation of `hops-postcss`](packages/postcss#css-grid--autoprefixer) to learn how to enable it.

### Code-splitting and `hops`s `importComponent()` function

You can use code-splitting (or bundle-splitting) to reduce the size of the assets that your users have to download by creating multiple bundles that contain only the code that is actually needed. Under the hood this uses [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) which webpack will transform into [separate bundles](https://webpack.js.org/guides/code-splitting/). Hops provides support for this with a custom function (called `importComponent()`) in order to render the actual content on the server-side and render a placeholder during client-side navigation.

**`src/my-component.js`**

```javascript
import React from 'react';
export default () => <p>This has been loaded lazily</p>;
```

**`src/app.js`**

```javascript
import { render, importComponent } from 'hops';
import React from 'react';

const MyLazyComponent = importComponent(() => import('./my-component'));

export default render(
  <div>
    <h1>Hello World</h1>
    <MyLazyComponent />
  </div>
);
```

### CLI / npm scripts

The `hops` package acts as a CLI to be used inside [npm scripts](https://docs.npmjs.com/cli/run-script) or [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b):

**`package.json`**

```json
{
  "scripts": {
    "start": "hops start",
    "build": "hops build",
    "serve": "hops serve"
  }
}
```

#### `hops --help`

The Hops CLI provides short help texts for all its commands. If, for example, you want to see what options are available for the `build` command you can type: `npx hops build --help`.

#### `npm start`

This command will either start the development server or execute a production build and start the production server, depending on the environment variable `NODE_ENV` and/or the `--production` flag.

_The production flag (`--production` or `-p`) is a shortcut for setting the environment variable `NODE_ENV=production`, so these two are interchangeable._

- `npm start` starts the development server with hot module reloading, etc.
- `npm start -- --fast-dev` (**experimental**) starts the development server with some optimizations for faster builds (_warning:_ this will lead to different bundles than in production, use with caution).
- `npm start -- --production` executes a production build and then starts the production server.
- `npm start -- --production --static`¹ exports static HTML pages for all configured [locations](#default-settings) and then starts the production server (_this only works in tandem with production mode_).

**¹:** the static HTML export has been [deprecated](https://github.com/untool/untool/blob/master/DEPRECATIONS.md#dep003).

#### `npm run build`

This command will execute a single build of all your assets.

- `npm run build` builds all assets in development mode.
- `npm run build -- --production` builds all assets in production mode (which includes minification, etc).
- `npm run build -- --static`¹ export static HTML pages for all configured [locations](#default-settings) in development mode.
- `npm run build -- --production --static`¹ export static HTML pages in production mode (enables minification, etc).
- `npm run build -- --analyze-client-bundle` visualize bundles' contents with [webpack bundle analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

**¹:** the static HTML export has been [deprecated](https://github.com/untool/untool/blob/master/DEPRECATIONS.md#dep003).

#### `npm run serve`

Starts a production ready Express.js server.

- `npm run serve` starts the server in development mode (without optimizations).
- `npm run serve -- --production` starts the server in production mode (enables gzip and other optimizations).

In order to deploy your application, you need to make sure to also include the `./node_modules/.cache/hops-webpack` directory in your deployment, because that is where the build output of the server middleware will be stored.\
You can also change that location by specifying a different [`serverDir`](#default-settings).

## Configuration

### Settings

You can provide settings to a Hops application via a `"hops"` key in your `package.json`.

#### Default settings

| Name | Type | Default | Example | Description |
| --- | --- | --- | --- | --- |
| `https` | `Boolean \| Object` | `false` | `true` or<br/>`{ "keyFile": "./my.key", "certFile": "./my.cert" }` | Configure HTTPS support for Hops |
| `host` | `String` | `[HOST]` | `10.10.10.10` | Specify the IP address that Hops should bind to |
| `port` | `String` | `[PORT]` | `1337` | Specify the Port that Hops should listen on |
| `locations` | `Array<String>` | `[]` | `["/", "/about"]` | An array of locations for static rendering of HTML pages |
| `basePath` | `String` | `''` | `/my-app` | The URL base path from which your application will be served |
| `assetPath` | `String` | `<basePath>` | `<basePath>/assets` | The URL base path from which the assets will be served |
| `distDir` | `String` | `<rootDir>/dist` | `<rootDir>/out` | The directory from which static assets will be served |
| `serverDir` | `String` | `node_modules/.cache/hops-webpack` | `<rootDir>/dist` | The directory where the generated server middleware will be stored |
| `browsers` | `Array<String>` | `['defaults']` | `['last 1 Chrome versions']` | An array of browserslist queries to specify targets for which to transpile/polyfill (see [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) for more information) |
| `node` | `String` | `current` | `10.13` | A Node.js version identifier or `current` to specify for which target to transpile/polyfill |
| `browserWhitelist` | `Object` | `{"basePath":true}` | A map of config keys that should be exposed to the client. Nested paths can be described using dot notation |

<a name="hops-alternative-config-file-format" title="Custom jump anchor: do not remove!"></a> Under the hood Hops uses [`cosmiconfig`](https://github.com/davidtheclark/cosmiconfig) to gather settings. So you're not limited to the `"hops"` key in your `package.json`, but can alternatively use an external settings file in the root directory of your project.\
The filename then has to be `hops.config.js` or `.hopsrc{.json,.yaml,.js}`.

#### Placeholders

Hops supports a special syntax to allow you to refer to other settings values. You can use angle brackets to do so:

**`package.json`**

```json
{
  "hops": {
    "basePath": "/foo",
    "assetPath": "<basePath>/assets"
  }
}
```

In the above example the value of `<basePath>` inside `assetPath` will be replaced with `/foo`, so `assetPath` becomes `/foo/assets`.

In case of nested objects you can also use the dot notation to access nested values:

**`package.json`**

```json
{
  "hops": {
    "foo": {
      "bar": "baz"
    },
    "qux": "<foo.bar>"
  }
}
```

#### Environment variables

Hops has a concept of "universal environment variables", which are environment variables that are evaluated at _runtime_ instead of at _build time_.

Usually when you reference `process.env.FOO` in your code, webpack will replace that expression with the value that the environment variable `FOO` had at build time. This is also true for Hops applications.

**But:** Since Hops renders applications on the server- and client-side, we can reference environment variables in the settings and pass them on to the client and therefore allow users to have environment variables that are evaluated at runtime. In order to expose configuration values to the client, we need to [whitelist them](#exposing-values-to-the-client).

**`package.json`**

```json
{
  "hops": {
    "myApiUrl": "[MY_API_URL]"
  }
}
```

The above example demonstrates how you can pass the value of the environment variable named `MY_API_URL` to Hops and later on you can access it in your application through its key like this:

**`src/app.js`**

```javascript
import { render, withConfig } from 'hops';
import React from 'react';

const Config = withConfig(({ config }) => <div>{config.myApiUrl}</div>);

export default render(<Config />);
```

This allows you to have just one build artifact that you can use in different environments (staging, production, etc).

**Tip:** You can use Hops's configuration mechanism to provide custom values to your application. As seen in the environment variable example above, you can specify arbitrary keys in your settings and access them in your React application.

**Tip:** When leveraging the bracket-notation you're able to set a default value, e.g. for your local development environment.

```json
{
  "hops": {
    "myApiUrl": "[MY_API_URL=http://localhost:9000]"
  }
}
```

**Tip:** Hops ships with integrated support for [`dotenv`](https://github.com/motdotla/dotenv), which means that it will try to read a `.env` file from your application root directory and load its values as environment variables.

#### Exposing values to the client

Hops requires you to whitelist all values from your configuration that need to be accessible to the client side. In order to do so, you can map the configuration keys to boolean values. For nested objects you can use the dot notation. Setting a value to `false` lets you override previously whitelisted values:

**`package.json`**

```json
{
  "hops": {
    "myApiUrl": "[MY_API_URL]",
    "some": {
      "other": "value"
    },
    "browserWhitelist": {
      "myApiUrl": true,
      "some.other": true,
      "basePath": false
    }
  }
}
```

**Note:** Have in mind that you must explicitly whitelist config properties, that hold an environment variable placeholder, otherwise the interpolation fails.

```json
{
  "foo": {
    "bar": "[FOOBAR]"
  },
  "browserWhitelist": {
    "foo.bar": true
  }
}
```

If you instead whitelist the whole nested object, that holds this property, Hops is currently not able to detect the placeholder.

```json
{
  "foo": {
    "bar": "[FOOBAR]"
  },
  "browserWhitelist": {
    "foo": true
  }
}
```

Besides that, whitelisting of nested objects as a whole is fine. Also this is considered a bug and will be fixed in one of the next minor releases.

### Options

You can provide options to your application by passing an options hash (a plain JavaScript object) as the second argument to the [`render()`](#renderelement-options) function in order to provide runtime configuration.

**`src/app.js`**

```javascript
export default render(<MyApp />, { router: { forceRefresh: true } });
```

## Presets

Almost everything in Hops is a preset that just needs to be installed / configured to extend your application with additional functionality.

### Installing presets

In order to install a preset you need to add it as a dependency to your application:

```shell
npm install --save hops-redux
```

Sometimes presets have `peerDependencies` which need to be installed as well - take a look at the [individual preset sections](#available-presets) or watch out for peer dependency warnings in your terminal.

### Activating presets

By default Hops will automatically find all explicitly installed presets by looking through the top-level dependencies in your `package.json`.

If you prefer, you can also explicitly list the presets that you want to use under the `"presets"` key in your [settings](#settings). This will disable automatic discovery of Hops presets.

**`package.json`**

```json
{
  "hops": {
    "presets": ["hops", "hops-redux"]
  }
}
```

Some presets require (or allow) additional configuration. Read the sections below for each of the presets you are using to find out what settings and options are available to you.

### Available presets

#### [`hops`](packages/hops)

This is the default preset that contains the basic building blocks for Hops itself, therefore it will always be available when creating a new Hops application. It takes care of setting up the CLI, Express.js server, webpack and React.js support.

##### Available components and functions

These components and functions are available as named exports on the `hops` package.

###### `render(element, [options])`

This is the main render function which you must call in - and export from - your entry file. It accepts two arguments: A React element (which is your root application) and an optional options hash that contains runtime configuration.

```javascript
import { render } from 'hops';

export default render(<MyApp />);
```

###### `<Miss />`

This component allows you to declaratively inform the Express.js server that there is nothing to render and it should delegate to the next middleware / or return with a `404` status code.

It is commonly used in an application's routing config as the last route:

```javascript
import { render, Miss } from 'hops';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

export default render(
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Miss />
  </Switch>
);
```

###### `<Status code={Number} />`

With this component you can declaratively change the status code of the HTTP response for server-side rendering:

```javascript
import { render, Status } from 'hops';
import React from 'react';

export default render(<Status code={418} />);
```

###### `<Header name={String} value={String} />`

With this component you can specify additional HTTP headers to be sent in the server-rendered response:

```javascript
import { render, Header } from 'hops';
import React from 'react';

export default render(<Header name="X-Foo" value="my-value" />);
```

###### `importComponent(moduleLoader, [exportResolver = (ns) => ns.default])`

Using the `importComponent()` function you can asynchronously load modules as React components into your application to help you reduce bundle sizes.

It works similarly to [`react-loadable`](https://github.com/jamiebuilds/react-loadable) but is deeply integrated with Hops to enable server-side rendering, etc.

```javascript
import { render, importComponent } from 'hops';

const Home = importComponent(() => import('./home'));

export default render(<Home />);
```

In case you have a file that exports named components, you can use the second argument to `importComponent` to control which export should be used:

```javascript
import { render, importComponent } from 'hops';

const Home = importComponent(
  () => import('./home'),
  (namespace) => namespace.Home
);

export default render(<Home />);
```

Components created using `importComponent` support some additional props to control module loading and placeholder rendering:

```javascript
import { render, importComponent } from 'hops';

const About = importComponent(() => import('./about'));

const loader = (load) =>
  Promise.race([
    new Promise((resolve, reject) => setTimeout(reject, 10000)),
    load(),
  ]);

const renderAbout = ({ Component, error, loading, ...props }) => {
  return error ? (
    <b>
      Error loading module <pre>{error.message}</pre>
    </b>
  ) : loading ? (
    <b>loading...</b>
  ) : (
    <Component {...props} />
  );
};

export default render(<About loader={loader} render={renderAbout} />);
```

Components (and their dependencies) imported using `importComponent` will be placed into separate chunks (i.e. asset files). Hops makes sure that all asset files containing modules used for server-side rendering are referenced in the initial HTML output.

**Note about `importComponent(moduleName, [exportName])`:** We still support the "string" syntax, where you could just pass a string for the file name and another string for the export name to the `importComponent` function, but we are discouraging the use of it, because it is not compatible with type-checked code and does not provide editor integration (point & click to open the file).

```javascript
import { render, importComponent } from 'hops';

const Home = importComponent('./home', 'Home');

export default render(<Home />);
```

During tests `importComponent` simply outputs the referenced component. If you'd rather like to test the `loading`- or the `error`-state of the lazy-loading placeholder component, you have to provide your own mock.

**Example: check the loading state**

```javascript
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import testRenderer from 'react-test-renderer';
import App from '../';

jest.mock('hops', () => {
  const hops = jest.requireActual('hops');

  hops.importComponent = () =>
    function ImportComponent({ render }) {
      return render({ loading: true });
    };

  return hops;
});

it('should display the loading state', () => {
  const app = testRenderer.create(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(app).toMatchSnapshot();
});
```

Similarly, to test the `error`-state of the lazy-loading placeholder component, pass `{ error: true }` into the `render`-function of the `importComponent`-mock.

###### `withConfig(Component)`

A component wrapped with this HoC (higher order component) will receive a prop called `config` which contains all [settings](#settings). Use this to pass custom settings to your application, for example to [make environment variables available](#environment-variables).

###### `useConfig(): Config`

React hook for accessing the `config`-property from inside a functional component.

###### `withServerData(Component)`

A component wrapped with this HoC gets access to "server data" via a prop called `serverData` which is useful to share data from code that runs on the server to the front-end.

This HoC is usually only useful for implementers of additional Hops presets.

###### `useServerData(): ServerData`

React hook for accessing the `serverData`-property from inside a functional component.

##### Options

_Reminder: These options must be passed in an options hash as the second argument to the [`render()`](#renderelement-options) function._

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `router.basename` | `String` | `settings.basePath` | The [`<BrowserRouter />`s basename prop](https://reacttraining.com/react-router/web/api/BrowserRouter/basename-string) (needs never to be set manually) |
| `router.getUserConfirmation` | `Function` | `window.confirm` | The [`<BrowserRouter />`s getUserConfirmation prop](https://reacttraining.com/react-router/web/api/BrowserRouter/getuserconfirmation-func) |
| `router.forceRefresh` | `Boolean` | `false` | The [`<BrowserRouter />`s forceRefresh prop](https://reacttraining.com/react-router/web/api/BrowserRouter/forcerefresh-bool) |
| `router.keyLength` | `Number` | `6` | The [`<BrowserRouter />`s keyLength prop](https://reacttraining.com/react-router/web/api/BrowserRouter/keylength-number) |

For more details and more advanced use-cases, head over to the [full readme of the `hops` preset](packages/hops).

#### [`hops-redux`](packages/redux)

This preset will set-up a Redux store, take care of dehydration / rehydration and wrap your application in a `<Provider />`.

Install it and its peer dependencies to your project:

```shell
npm install --save hops-redux react-redux redux redux-thunk
```

And pass your reducers as [options](#options) to the second argument of your [`render()`](#renderelement-options) function:

**`src/app.js`**

```javascript
import { render } from 'hops';
const myReducers = {
  increment(state = 0, action) {
    return action.type === 'INCREMENT' ? state + action.payload : state;
  },
};
export default render(<MyApp />, { redux: { reducers: myReducers } });
```

##### Settings

_Reminder: These settings go into your `package.json` or [Hops configuration file](#hops-alternative-config-file-format)._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `shouldPrefetchOnServer` | `Boolean` | `true` | _no_ | Whether Hops should execute route-bound action creators during server-side rendering **[deprecated]** |
| `allowServerSideDataFetching` | `Boolean` | `true` | _no_ | Whether Hops is allowed to execute route-bound action creators during server-side rendering |

##### Options

_Reminder: These options must be passed in an options hash as the second argument to the [`render()`](#renderelement-options) function._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `redux.reducers` | `Object` | `{}` | _yes_ | An object [whose values](https://redux.js.org/api/combinereducers/#arguments) consists of all your reducer functions. |
| `redux.middlewares` | `Array` | `[ReduxThunkMiddleware]` | _no_ | An array of all [redux middlewares](https://redux.js.org/api/applymiddleware/) you want to use. |
| `redux.actionCreators` | `Array` | `[]` | _no_ | An array of route-bound action creators to be dispatched when the current route matches. |
| `redux.alwaysDispatchActionsOnClient` | `boolean` | `undefined` | _no_ | When using server side rendering the route-matching actions will be dispatched on the server only - pass `true` to also dispatch these actions on the client again. |

For more details and more advanced use-cases, head over to the [full readme of `hops-redux`](packages/redux).

#### [`hops-react-apollo`](packages/react-apollo)

This preset will create an [Apollo client](https://www.apollographql.com/docs/react/) and take care of dehydration / rehydration and wrap your application in an `<ApolloProvider />`.

Install it to your project:

```shell
npm install --save hops-react-apollo graphql-tag react-apollo
```

And specify your GraphQL endpoint URI in the settings:

**`package.json`**

```json
{
  "hops": {
    "graphqlUri": "https://www.graphqlhub.com/graphql"
  }
}
```

##### Settings

_Reminder: These settings go into your `package.json` or [Hops configuration file](#hops-alternative-config-file-format)._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `fragmentsFile` | `String` | `<rootDir>/fragmentTypes.json` | _no_ | Where to store the generated fragment types file |
| `graphqlUri` | `String` | `''` | _yes_ | URI to your GraphQL endpoint or mock server |
| `graphqlSchemaFile` | `String` | `''` | _no_ | Path to your GraphQL schema file |
| `shouldPrefetchOnServer` | `Boolean` | `true` | _no_ | Whether Hops should execute GraphQL queries during server-side rendering **[deprecated]** |
| `allowServerSideDataFetching` | `Boolean` | `true` | _no_ | Whether Hops is allowed to execute GraphQL queries during server-side rendering |

##### Options

_Reminder: These options must be passed in an options hash as the second argument to the [`render()`](#renderelement-options) function._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `graphql.link` | `ApolloLink` | `ApolloHttpLink` | _no_ | An instance of a `apollo-link` |
| `graphql.cache` | `ApolloCache` | `ApolloCacheInMemory` | _no_ | An instance of a `apollo-cache` |

For more details and more advanced use-cases, head over to the [full readme of `hops-react-apollo`](packages/react-apollo) for more details.

#### [`hops-apollo-mock-server`](packages/apollo-mock-server)

This preset will provide a Apollo Server that can be used for GraphQL mocking. This can be useful for local development and automated test environments.

_Reminder: These settings go into your `package.json` or [Hops configuration file](#hops-alternative-config-file-format)._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `graphqlMockSchemaFile` | `String` | `''` | _no_ | Path to your GraphQL schema mocks |
| `graphqlMockServerPath` | `String` | `'/graphql'` | _no_ | Path of the mock server endpoint |

For more details and more advanced use-cases, head over to the [full readme of `hops-apollo-mock-server`](packages/apollo-mock-server) for more details.

#### [`hops-postcss`](packages/postcss)

This preset will enable PostCSS support with [CSS modules](https://github.com/css-modules/css-modules) and add the [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) to your project.

Install it to your project:

```shell
npm install --save hops-postcss
```

Now you can use `import`/`require` to load `.css` files and style your components.\
At the end they will be combined to a single CSS file and loaded automatically.

**`src/styles.css`**

```css
.headline {
  color: red;
}
```

**`src/app.js`**

```javascript
import { render } from 'hops';
import React from 'react';
import styles from './styles.css';

export default render(<h1 className={styles.headline}>hello world</h1>);
```

**Hint:** You can opt-out of css-modules by appending a `?global` query parameter to your import statement (for example: `import styles from 'animate.css/animate.min.css?global';`).

For more details and more advanced use-cases, head over to the [full readme of `hops-postcss`](packages/postcss).

#### [`hops-styled-components`](packages/styled-components)

This preset will enable support for server-side rendering of [styled-components](https://www.styled-components.com/) and set-up a `<ThemeProvider />` for you.

Install it to your project:

```shell
npm install --save hops-styled-components styled-components
```

Now you can use styled-components in your app and it will work out of the box with server-side rendering.

**`src/app.js`**

```javascript
import { render } from 'hops';
import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  position: sticky;
`;

export default render(<H1>hello</H1>);
```

##### Options

_Reminder: These options must be passed in an options hash as the second argument to the [`render()`](#renderelement-options) function._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `styled.theme` | `Object` | `{}` | _no_ | A theme object for the styled-components `<ThemeProvider />` |

For more details and more advanced use-cases, head over to the [full readme of `hops-styled-components`](packages/styled-components).

#### [`hops-typescript`](packages/typescript)

This preset will enable you to write your Hops application using [TypeScript](https://www.typescriptlang.org/).

Install it to your project:

```shell
npm install --save hops-typescript
npm install --save-dev typescript
```

And create a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file in your application root folder (you are free to extend our [minimal `tsconfig.json`](./packages/typescript/tsconfig.json) that we ship with this module or write it yourself).

**`tsconfig.json`**

```json
{
  "extends": "./node_modules/hops-typescript/tsconfig.json"
}
```

For more details and more advanced use-cases, head over to the [full readme of `hops-typescript`](packages/typescript).

#### [`hops-pwa`](packages/pwa)

This preset enables PWA features, such as web app manifest and service workers for Hops projects.

Install it to your project:

```shell
npm install --save hops-pwa
```

Now you can `import`/`require` your web app manifest and render a `<link />` tag for it:

**`src/app.js`**

```javascript
import { render } from 'hops';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import manifest from './manifest.webmanifest';

export default render(
  <Helmet>
    <link rel="manifest" href={manifest} />
  </Helmet>
);
```

To install a service worker, you need to create a worker file with your implementation and specify the path of that file via `workerFile` in your [settings](#settings):

**`src/worker.js`**

```javascript
export default (config, assets) => {
  // config contains all values of your settings
  // assets is a list of all your applications public assets
  // in here you can now do things with the `install` and `fetch`
  // events and `caches` to build your own worker implementation.
};
```

And then register the service worker in your main entry file:

**`src/app.js`**

```javascript
import { render } from 'hops';
import React from 'react';
import installServiceWorker from 'hops-pwa';

installServiceWorker();

export default render(<h1>hello world</h1>);
```

##### Settings

_Reminder: These settings go into your `package.json` or [Hops configuration file](#hops-alternative-config-file-format)._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `workerPath` | `String` | `<basePath>/sw.js` | _no_ | The path on which to serve the service worker |
| `workerFile` | `String` | `hops-pwa/worker.js` | _yes_ | The path to the service worker entry file |

For more details and more advanced use-cases, head over to the [full readme of `hops-pwa`](packages/pwa).

#### [`hops-development-proxy`](packages/development-proxy)

Hops apps are often served on the same host as their backend/API, so during development we provide this preset, that sets up an HTTP proxy to forward any unknown requests to the configured remote URL.

Install it to your project:

```shell
npm install --save-dev hops-development-proxy
```

And configure your remote endpoint:

**`package.json`**

```json
{
  "hops": {
    "proxy": "https://example.org/api/"
  }
}
```

##### Settings

_Reminder: These settings go into your `package.json` or [Hops configuration file](#hops-alternative-config-file-format)._

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `proxy` | `String \| Object` | `undefined` | _no_ | Proxy target configuration |

This will proxy all requests that are not assets and don't have `text/html` in its `Accept` header to the configured proxy endpoint.

For more details and more advanced use-cases, head over to the [full readme of `hops-development-proxy`](packages/development-proxy).

#### [`hops-lambda`](packages/lambda)

This preset enables simple deployment workflows to AWS Lambda.

Install it to your project:

```shell
npm install --save hops-lambda
```

Now all you need to do is [configure your AWS credentials](packages/lambda#aws-configuration)\
and set your [`basePath`](#default-settings) to `prod` and then you are all set to deploy your application:

**`package.json`**

```json
{
  "hops": {
    "basePath": "prod"
  }
}
```

Then execute `hops lambda deploy` to deploy your application to AWS Lambda. At the end the command will finish by printing the URL to your application.

```shell
npx hops lambda deploy
```

##### Settings

_Reminder: These settings go into your `package.json` or [Hops configuration file](#hops-alternative-config-file-format)._

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `aws.region`\* | `String` | `us-east-1` | The AWS Region in which the resources should be created |
| `aws.uniqueName` | `String` | `hops-lambda-$name` | A unique name that is used to identify the AWS CloudFormation Stack and S3 bucket. |
| `aws.memorySize` | `Number` | `128` | The memory allocated to your Lambda function |
| `aws.stageName` | `String` | `prod` | The name of your API Gateway stage |
| `aws.domainName` | `String` | `''` | A custom domain name |
| `aws.certificateArn` | `String` | `''` | If a custom domain is used, this option needs to specify the ARN of a valid SSL certificate in ACM |
| `aws.cloudformationTemplateFile` | `String` | `node_modules/hops-lambda/cloudformation.yaml` | Path to a custom CloudFormation template |

_\* If no region is configured via the preset config, `hops-lambda` will try to read `AWS_REGION` and `AWS_DEFAULT_REGION` from your environment first before defaulting to `us-east-1`._

For more details and more advanced use-cases, head over to the [full readme of `hops-lambda`](packages/lambda).

#### [`jest-preset-hops`](packages/jest-preset)

Hops uses webpack to configure and instrument your application. However, test runners aren't compatible with this setup out of the box.

`jest-preset-hops` is a [Jest preset](https://jestjs.io/docs/en/configuration.html#preset-string) that allows to write tests for Hops applications. It aims to support all features that the official `hops-*` packages provide (e.g. transpiling your files with babel) inside of your Jest tests.

Install it to your project:

```shell
npm install --save-dev jest-preset-hops jest
```

Add `jest-preset-hops` as [preset](https://facebook.github.io/jest/docs/en/configuration.html#preset-string) to your Jest config. This can for example be done by adding it to your package.json.

```json
{
  "jest": {
    "preset": "jest-preset-hops"
  }
}
```

## Advanced configuration and extension

### Debugging

Hops and its underlying tools provide debugging output via the [`debug`](https://www.npmjs.com/package/debug) module.\
In order to enable debug output you need to set an environment variable called `DEBUG`.

For example the following command would log all debug statements of Hops:

```shell
DEBUG=hops* npm start
```

Another common issue is multiple versions of the same dependency. For example `webpack` and `hops` should only ever be installed in one version.\
Use `npm ls hops; npm ls webpack;` (or, if you are using yarn: `yarn list --pattern 'hops|webpack'`) to find out if there are duplicate packages and try to remove the duplication by re-installing or deleting your lock files, etc.

### Mixins

Mixins are the primary building blocks to extend and alter Hops' functionality. In fact all of the above mentioned [presets](#presets) contain mixins too.

There are three different types of mixins that each affect a different region of the Hops architecture.

- **core** mixins can be used to extend / alter the behaviour of the surrounding build tooling, Express.js server and CLI commands
- **runtime** mixins contain code that affects the server- and client-side rendering of your application and can be used to fetch data, set-up React context providers, etc
  - **server** mixins are a subset of runtime mixins that are only executed during server-side rendering
  - **browser** mixins are a subset of runtime mixins that are only executed during client-side rendering

Mixins interact with each other by implementing hooks that will be called from the Hops core. Mixins can also provide their own hooks which can then be implemented by other mixins. This functionality is provided by [`mixinable`](https://github.com/untool/mixinable).

A mixin is either a file with a name of: `mixin.{core,runtime,server,browser}.js` or `mixin.js` or it can be a file inside an npm package that is referenced through that package's `package.json` via the following fields: `"mixin:{core,runtime,server,browser}"` or `"mixin"`.

### Creating your first core mixin

In order to create a mixin inside your application we first need to create a new folder:

```shell
mkdir my-new-mixin
```

Then, inside this folder, we will create a file named `mixin.core.js` which will add a custom [resolve alias](https://webpack.js.org/configuration/resolve/#resolve-alias) to your webpack config:

**`mixin.core.js`**

```javascript
const { Mixin } = require('hops');

class MyMixin extends Mixin {
  configureBuild(webpackConfig) {
    webpackConfig.resolve.alias['my-modules'] = path.resolve(
      this.config.rootDir,
      'my-aliased-modules'
    );
  }
}

module.exports = MyMixin;
```

And now we need to make this mixin known to your application by specifying it in the `"mixins"` array in your [settings](#settings):

**`package.json`**

```javascript
{
  "hops": {
    "mixins": ["./my-new-mixin"]
  }
}
```

That's it! Now Hops will use your mixin to alter the built-in webpack configuration.

### Configuring webpack (and babel) through a core mixin

In order to allow you to configure webpack and its included loaders (such as the babel-loader), you can write a core mixin and implement the `configureBuild` hook:

#### `configureBuild(webpackConfig, loaderConfigs, target)`

The `configureBuild` hook will be called with these three arguments:

- `webpackConfig` is the entire webpack configuration object which you can mutate in place to achieve different behaviours
- `loaderConfigs` is a custom object that contains references to the loaders for easier access
  - `loaderConfigs.jsLoaderConfig` is a direct reference to the [`babel-loader`](https://github.com/babel/babel-loader) config [object](./packages/webpack/lib/configs/build.js#L22)
  - `loaderConfigs.urlLoaderConfig` is a direct reference to the [`url-loader`](https://github.com/webpack-contrib/url-loader) config [object](./packages/webpack/lib/configs/build.js#L58)
  - `loaderConfigs.fileLoaderConfig` is a direct reference to the [`file-loader`](https://github.com/webpack-contrib/file-loader) config [object](./packages/webpack/lib/configs/build.js#L50)
  - `loaderConfigs.allLoaderConfigs` is a reference to the [array containing all loaders](./packages/webpack/lib/configs/build.js#L75) which gets applied to [`module.rules.oneOf`](https://webpack.js.org/configuration/module/#rule-oneof).
- `target` indicates what the current config will be used for and will be one of:
  - `build` this is the webpack config that will be used for the client-side build when you execute `hops build`
  - `develop` this is the webpack config that will be used for the client-side development build when you execute `hops start`
  - `node` this is the webpack config that will be used for the server-side build (which will be used for both, watch/development mode and production mode)

#### Example: Adding a webpack plugin

In this example we will add the [webpack `BannerPlugin`](https://webpack.js.org/plugins/banner-plugin/) to demonstrate how to extend your webpack configuration:

**`mixin.core.js`**

```javascript
const { Mixin } = require('hops');
const { BannerPlugin } = require('webpack');

class MyWebpackMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs, target) {
    if (target === 'build') {
      webpackConfig.plugins.push(new BannerPlugin('hello world'));
    }
  }
}

module.exports = MyWebpackMixin;
```

#### Example: Adding a babel plugin

In this example we will add a [babel plugin](https://babeljs.io/docs/en/plugins) to your [babel-loader](https://github.com/babel/babel-loader):

**`mixin.core.js`**

```javascript
const { Mixin } = require('hops');

class MyWebpackMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs, target) {
    loaderConfigs.jsLoaderConfig.options.plugins.push(
      require.resolve('@babel/plugin-proposal-decorators')
    );
  }
}

module.exports = MyWebpackMixin;
```

### Configuring Express.js through a core mixin

#### `configureServer(app, middlewares, mode)`

The `configureServer` hook will be called with these three arguments:

- `app` This is an [Express.js application](https://expressjs.com/en/api.html#app) instance that allows you to reconfigure the application
- `middlewares` This is an object whose keys are "middleware phases" (to allow more structured ordering) and the values are arrays into which middleware can be pushed / unshifted:
  1. `initial` middlewares in this phase will be registered before all others, so you can use this phase to register middlewares that should run initially
  2. `files` this is the next phase and is internally being used to register middlewares like `express-static` to serve static files
  3. `parse` this phase can be used to register middlewares that parses data from incoming requests (e.g. `cookie-parser` or `body-parser`)
  4. `routes` Hops will register the universal render middleware which renders your application in this phase
  5. `final` this phase may be used to register error-handling or other middlewares that should be run last
  - additionally each phase has a `pre` / `post` phase (e.g. `preinitial` or `postfinal`)
- `mode` describes the mode that the server is operating in, it can be one of:
  - `develop` this is the development mode, which is being used when starting Hops in development (e.g. `hops start`). In this mode there will be webpack middlewares that render, watch and recompile your application as you change your application code
  - `serve` this is the production server mode, which is being used when starting Hops via `hops serve` or `hops start -p`. In this mode there will be middlewares to serve static files from the `distDir` and your app will be rendered through the prebuilt universal render middleware (which will be created when you run `hops build`)
  - `static` will be used when exporting static HTML pages (e.g. `hops build -s` or `hops start -ps`). In this mode the server will not be bound to an actual network interface but instead mock requests are being sent against the prebuilt middleware

#### Example: Adding the cookie-parser middleware

In this example we will add the [`cookie-parser` middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.third-party) to the `middlewares.parse` array:

**`mixin.core.js`**

```javascript
const { Mixin } = require('hops');
const cookieParser = require('cookie-parser');

class MyExpressMixin extends Mixin {
  configureServer(app, middlewares, mode) {
    middlewares.parse.push(cookieParser());
  }
}

module.exports = MyExpressMixin;
```

#### Example: Passing data from server to a React component

To pass data we will use the [`enhanceServerData` mixin hook](packages/react#enhanceserverdataserverdata-req-res-serverdata-pipe-server) to pass data. The HoC[`withServerData`](packages/react#withserverdatacomponent-higherordercomponent) will expose the data via the `serverData` prop.

**`mixin.core.js`**

```javascript
configureServer(app, middlewares, mode) {
  middlewares.initial.push((req, res, next) => {
    // Note: res.locals should be used for locally scoped data
    // https://expressjs.com/en/4x/api.html#res.locals
    res.locals.someKey = "someValue"
    next();
  });
}
```

**`mixin.server.js`**

```javascript
enhanceServerData(data, req, res) {
  return { ...data, someKey: res.locals.someKey };
}
```

**`my-component.js`**

```javascript
const MyComponent = ({ serverData }) => <div>{serverData.someKey}</div>;

export default withServerData(MyComponent);
```

### Configuring rendering through runtime mixins

Hops provides multiple hooks to customize rendering. We'll only show an example for the `enhanceElement` hook here, but encourage you to browse through the source code of Hops to find other runtime (or browser/server) mixins to see examples of these hooks in action.

The `enhanceElement(reactElement)` hook will be called in a [functional composition](<https://en.wikipedia.org/wiki/Function_composition_(computer_science)>) manner and therefore accepts a single argument of the type of a React element and expects you to return a React element which wraps the input.

The following example demonstrates how you could implement a custom [mobx](https://mobx.js.org/) preset:

**`mixin.runtime.js`**

```javascript
const { Mixin } = require('hops');
const { Provider } = require('mobx-react');
const React = require('react');

class MyMobxMixin extends Mixin {
  constructor(config, element, { mobx: options = {} } = {}) {
    super(config);
    this.stores = options.stores;
  }

  enhanceElement(reactElement) {
    return <Provider {...this.stores}>{reactElement}</Provider>;
  }
}

module.exports = MyMobxMixin;
```

And then, once [activated](#activating-presets), you can use it like this in your application:

**`src/app.js`**

```javascript
import { render } from 'hops';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';

const theme = observable(
  {
    color: 'red',
    setColor(color) {
      this.color = color;
    },
  },
  { setColor: action }
);

const MyApp = inject('theme')(
  observer((props) => (
    <h1
      style={{ color: props.theme.color }}
      onClick={() => props.theme.setColor('green')}
    >
      hello world
    </h1>
  ))
);

export default render(<MyApp />, { mobx: { stores: { theme } } });
```

### Presets

Presets are being used to provide reusable / shareable [settings](#settings). Optionally they can also provide and configure their own mixins.

A preset is just a plain JavaScript file that exports a JavaScript object. A preset needs to be named `preset.js` or be specified in the `"preset"` field of the `package.json`.

#### Example: Preset containing shared settings

Firstly we need to create a new folder (or a npm package) for our preset:

```shell
mkdir my-awesome-preset
```

Then we create a `preset.js` file in this folder and specify some settings and their values that we want to share:

**`preset.js`**

```javascript
module.exports = {
  browsers: ['IE11', '> 0.5%'],
};
```

Now we need to make this preset known to your application. Read the [activating presets](#activating-presets) section above to see how you can activate a preset.

#### Example: Preset containing custom mixins

Usually when you create a mixin and want to share it with others, you would create an npm package that contains the mixin and also a preset that specifies all [settings](#settings) that your mixin uses and defines some sane defaults for it.

Firstly we need to create a new folder (or an npm package) for our preset:

```shell
mkdir my-awesome-preset
```

Then we create a `preset.js` file in this folder and specify your included mixins via the `"mixins"` settings:

**`preset.js`**

```javascript
module.exports = {
  mixins: [__dirname],
};
```

This will instruct Hops to [look for mixins](#mixins) inside this directory, so you should place a `mixin.{core,runtime,browser,server}.js` file there too containing your mixin code.

#### Example: Shareable preset to bundle and configure other presets

Presets can also contain and configure other presets. This is useful if, for example, you want to provide a company-wide selection of Hops presets inside a single dependency.

First we need to create a new npm package which contains the following `preset.js` file:

**`preset.js`**

```javascript
module.exports = {
  graphqlUri: 'https://my-company.com/graphql',
  presets: ['hops', 'hops-graphql', 'hops-styled-components'],
};
```

And then this new package / preset should have all the presets that it references as its dependencies, so that your users don't have to install them themselves.

## Contributing

Please refer to our [contribution guide](https://github.com/xing/hops/blob/master/CONTRIBUTING.md).

This project adheres to the [Contributor Covenant Code of Conduct](http://github.com/xing/hops/blob/master/CODE_OF_CONDUCT.md)

## Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
