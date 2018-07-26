<p align="center">
  <img
    width="200"
    height="217"
    src="https://raw.githubusercontent.com/wiki/xing/hops/logo.png"
  />
</p>

<h1 align="center">Hops Development Environment</h1>

<p align="center">
  <a href="https://travis-ci.org/xing/hops">
    <img src="https://img.shields.io/travis/xing/hops.svg">
  </a>
</p>
<p>&nbsp;</p>

Hops is everything you need to develop and deploy a production grade universal web application with [React](https://facebook.github.io/react/). It provides both a **universal runtime** as well as the necessary **build tooling**.

Hops targets beginners and experts alike and follows React mainstream best practices.

The two guiding principles are:

1.  Hops scales with your requirements, from an easy start up to large scale applications with many teams
2.  Hops fits a broad need by being modular and extensible, it comes with reasonable defaults, but allows you to customize, configure, and extend almost everything when needed

## Quick start

```shell
npx hops init my-awesome-project
cd my-awesome-project
npm start
```

This will start hops in development mode. Visit [http://localhost:8080](http://localhost:8080) to see your app in the browser and make some changes to the code in your editor to see it live-reloading.

### Templates

Hops provides a few templates as starting points, which can be installed using the `--template` option of the [Hops CLI `init` command](https://github.com/xing/hops/tree/next/packages/cli).

#### [`hops-template-react`](https://github.com/xing/hops/tree/next/packages/template-react) (default)

This is the default template, it consists of a simple React starting point and it is being used when you execute:

```bash
$ hops init my-awesome-project
```

#### [`hops-template-redux`](https://github.com/xing/hops/tree/next/packages/template-redux)

In case you want to build a Redux project, you can use this template as a starting point.

```bash
$ hops init my-awesome-project --template hops-template-redux
```

#### [`hops-template-graphql`](https://github.com/xing/hops/tree/next/packages/template-graphql)

In case you want to build a GraphQL project, you can use this template as a starting point.

```bash
$ hops init my-awesome-project --template hops-template-graphql
```

#### [`hops-template-minimal`](https://github.com/xing/hops/tree/next/packages/template-minimal)

This template is not seriously meant as a starting point for your project, but rather a reference that demonstrates using Hops without React and might be useful to someone trying to create Vue.js bindings for Hops or something similar.

## Presets

Almost everything in Hops is a preset that just needs to be installed / configured in order to start using it.

There are a few core presets that we recommend be always installed. They take care of setting up [Express.js](https://expressjs.com/), [webpack](https://webpack.js.org/) and [yargs](http://yargs.js.org/) to supply the basic building blocks of Hops.\
**Therefore we have bundled them together in the convenience preset [`hops-preset-defaults`](https://github.com/xing/hops/tree/next/packages/preset-defaults)**. We also recommend that you always install the [`hops-react`](https://github.com/xing/hops/tree/next/packages/react) preset in order to start using [React](https://reactjs.org/) in your application.

### Installing / configuring a preset

In order to install or configure a preset you need to add it as a dependency to your application:

```bash
$ yarn add hops-redux
# OR npm install --save hops-redux
```

Sometimes presets have `peerDependencies` which need to be installed as well - take a look at the [indiviual preset sections](#available-presets) or watch out for peer dependency warnings in your terminal.

By default Hops will find installed presets automatically (only when it is listed as a top-level dependency in your `package.json` - we won't attempt to find presets in dependencies of dependencies).

If you prefer, you can also explicitly list the presets that you want to use under the `presets` key in your [application configuration](#configuration).

```json
{
  "hops": {
    "presets": ["hops-preset-defaults", "hops-react", "hops-redux"]
  }
}
```

Some presets require (or allow) additional configuration. Read the sections below for each of the presets you are using to find out what options are available to you.

### Available presets

In addition to the core presets that [we mentioned earlier](#presets) these following presets are available to help you with the struggles of universal rendering, deployments, service workers and such.

#### `hops-redux`

This preset will set-up a Redux store, take care of dehydration / rehydration and wrapping your application in a `<Provider />`.

Install it to your project:

```bash
$ yarn add hops-redux react-redux redux redux-thunk
```

And pass your reducers as [render options](https://github.com/xing/hops/tree/next/packages/redux#render-options):

```javascript
import { render } from 'hops-react';
export default render(<MyApp />, { redux: { reducers: myReducers } });
```

For more details and more advanced use-cases, head over to the [full readme of `hops-redux`](https://github.com/xing/hops/tree/next/packages/redux).

#### `hops-graphql`

This preset will create an [Apollo client](https://www.apollographql.com/docs/react/) and take care of dehydration / rehydration and wrapping your application in an `<ApolloProvider />`.

Install it to your project:

```bash
$ yarn add hops-graphql graphql-tag react-apollo
```

And configure your GraphQL endpoint URI:

```json
{
  "hops": {
    "graphqlUri": "https://www.graphqlhub.com/graphql"
  }
}
```

Now you can use GraphQL in your project. Check out [this integration test](https://github.com/xing/hops/blob/next/packages/spec/integration/graphql) or [the `hops-graphql` template](https://github.com/xing/hops/tree/next/packages/template-graphql) to see usage examples and head over to [the `hops-graphql` readme](https://github.com/xing/hops/tree/next/packages/graphql) for more details.

#### `hops-postcss`

This preset will enable PostCSS support with [CSS modules](https://github.com/css-modules/css-modules) via a [css-loader](https://github.com/webpack-contrib/css-loader) and add the [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) to your project.

Install it to your project:

```bash
$ yarn add hops-postcss
```

Now you can use `import`/`require` to load `.css` files and style your components.\
At the end they will be combined to a single CSS file and loaded automatically.

```javascript
import { render } from 'hops-react';
import styles from './styles.css';

export default render(<h1 className={styles.headline}>hello world</h1>).
```

For more details take a look at the [`hops-postcss` readme](https://github.com/xing/hops/tree/next/packages/postcss).

#### `hops-styled-components`

This preset will enable support for server-side rendering of [styled-components](https://www.styled-components.com/) and set-up a `<ThemeProvider />` for you.

Install it to your project:

```bash
$ yarn add hops-styled-components styled-components
```

Now you can use styled-components in your app and it will work out of the box with server-side rendering.

```javascript
import { render } from 'hops-react';
import styled from 'styled-components';

const H1 = styled.h1`
  position: sticky;
`;

export default render(<H1>hello</H1>);
```

Read the [`hops-styled-components` readme](https://github.com/xing/hops/tree/next/packages/styled-components) for more detailed examples.

#### `hops-typescript`

This preset will enable you to write your Hops application using [TypeScript](https://www.typescriptlang.org/).

Install it to your project:

```bash
$ yarn add hops-typescript
```

And create a `tsconfig.json` file in your application root folder (you are free to extend our [minimal `tsconfig.json`](https://github.com/xing/hops/blob/next/packages/typescript/tsconfig.json) that we ship with this module or write it yourself).

```json
{
  "extends": "./node_modules/hops-typescript/tsconfig.json"
}
```

Take a look at this [integration test](https://github.com/xing/hops/tree/next/packages/spec/integration/typescript) to see an example of this in action and head over to the [readme of `hops-typescript`](https://github.com/xing/hops/tree/next/packages/typescript) for more details.

#### `hops-pwa`

This preset enables PWA features, such as web app manifest and service workers for Hops projects.

Install it to your project:

```bash
$ yarn add hops-pwa
```

Now you can `import`/`require` your web app manifest and render a `<link />` tag for it:

```javascript
import { render } from 'hops-react';
import manifest from './manifest.webmanifest';

export default render(
  <Helmet>
    <link rel="manifest" href={manifest} />
  </Helmet>
);
```

For more details and examples on how to use service workers read the [full readme for `hops-pwa`](https://github.com/xing/hops/tree/next/packages/pwa).

#### `hops-lambda`

This preset enables simple deployment workflows to AWS Lambda.

Install it to your project:

```bash
$ yarn add hops-lambda
```

Now all you need to do is [configure your AWS credentials](https://github.com/xing/hops/tree/next/packages/lambda#aws-configuration)\
and set your `basePath` to `prod` and then you are all set to deploy your application:

```bash
$ hops lambda deploy
```

For more advanced deployments and other scenarios take a look at the [full readme of `hops-lambda`](https://github.com/xing/hops/tree/next/packages/lambda).

## Configuration

Hops uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for its configuration, therefore you can configure Hops using any of the following ways:

- a `hops` key in your `package.json`
- a `.hopsrc` file in your applications root dir
- a `.hopsrc.{json,yaml,yml,js}` file in your applications root dir
- a `hops.config.js` file in your applications root dir

## FAQ

### When is Hops the framework for you?

When you want to share a consistent setting over more than one project. Either now or in the future. This applies to companies with more than one development team or when you constantly set up projects that should be consistent, e.g. training projects, tutorials, consultant work, etc.

Even without striving for consistency across multiple projects you may want to use Hops for a (single) new project when you do not want to write/copy/maintain your own webpack configuration. We feel your pain and have done that for you. However, we try hard to give you all the customizability you may ever need.

### When is Hops **not** the framework for you?

If you are new to React and just want a small sample app or mainly want to learn, we recommend to get started with [Create React App](https://github.com/facebook/create-react-app). Once you are getting more serious about your application you can still switch to Hops.

### Why not just use Create React App?

[Create React App](https://github.com/facebook/create-react-app) is great when you want to experiment with or learn React. For simplicity it is neither configurable nor extensible and does not evolve with you when you are ready to create a production ready app. Hops on the other hand might be a bit harder to get started, but has the complete potential for even large scale applications.

Additionally, contrary to Create React App, Hops is geared towards universal apps.

### Why a framework and not just a few code snippets describing best practices?

There are two main reasons. Firstly, snippets get outdated. Hops, however, is committed to best practices and to evolve with them. Secondly, Hops is organized in modules that need to run both on the client and on the server. Keeping a track of both sides and at the same time maintaining an in-sync version of a client-side and server-side snippet per module can be really tedious. Using a framework like Hops takes away that pain.

### Why does Hops not support "eject"?

[Create React App](https://github.com/facebook/create-react-app) offers you the option to "eject". This means dumping Webpack configuration files and scripts, leaving you with a stand-alone project. We Hops people do not think, this is a good idea. Those files still force their philosophy on you while at the same time they are hard to understand. We thus do not believe this to be a practical way to overcome vendor lock-in. Hops instead allows you to customize either by configuration or adding modules.

### Can we trust in Hops to be around for the forseeable future?

Just as you might put trust into React as Facebook has committed itself to it and eats its own dog food, Hops is being backed and used by a European professional networking site.

Hops being primarily an (extensible) bunch of mainstream best practices, it ought to be rather simple to move off it and do something that better fits the user's requirements. So, the lock-in ought to be way less problematic than, say, with React. Porting a non-trivial app from React to Angular or Vue certainly is a lot more work than replacing Hops with its actual building blocks (Webpack, Babel, etc.)

### I like Hops, but I want to use something that is not quite mainstream

Hops allows you to write a package of your own and plug it into Hops' build process. Take a look at all the packages in this repository and read [the `@untool/core` documentation](https://github.com/untool/untool/blob/master/packages/core/README.md#presets) for more information about presets and mixins.

## Contributing

### Code

Hops uses [lerna](https://github.com/lerna/lerna) and [yarn](https://yarnpkg.com/en/) for development and publishing of the packages. Therefore it is required to have `yarn` globally available.

If you want to contribute to this project, create a fork of its [repository](https://github.com/xing/hops/fork) using the GitHub UI. Check out your new fork to your computer:

```bash
mkdir hops && cd $_
git clone git@github.com:user/hops.git .
```

Afterwards, you can `yarn install` the required dependencies and then run `yarn bootstrap` to install the dependencies of all packages and link the packages together.

Using `yarn start` will execute the `start` script in the [hops-template-react](https://github.com/xing/hops/tree/master/packages/template-react) so that you can verify your changes in the browser.

When you are finished, please do go ahead and create a [pull request](https://help.github.com/articles/creating-a-pull-request/).

Hops is entirely written in ECMAScript 5 and its code is formatted using [prettier](https://prettier.io). Please make sure your contribution does, too.

## Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
