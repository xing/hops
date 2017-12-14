<p align="center">
  <img
    width="200"
    height="217"
    src="https://github.com/xing/hops/blob/master/logo.png?raw=true"
  />
</p>

<h1 align="center">Hops Development Environment</h1>

<p align="center">
  <a href="https://travis-ci.org/xing/hops">
    <img src="https://img.shields.io/travis/xing/hops.svg">
  </a>
</p>
<p>&nbsp;</p>

Hops is a modular development, build and runtime environment for universal ("isomorphic") web applications. It focuses on [React](https://facebook.github.io/react/).

Hops is designed to simplify getting started with modern frontend tooling. It streamlines [Webpack](https://webpack.js.org) and [Jest](https://facebook.github.io/jest/) configuration featuring [Babel](https://babeljs.io) and [PostCSS](http://postcss.org).

### Quick start

If you just want to get started with hops + react you can execute the following command to initialize a small example app:

```shell
npm install -g hops-cli
hops init my-awesome-project
cd my-awesome-project
npm start
```

This will start hops in development mode. Visit [http://localhost:8080](http://localhost:8080) to see your app in the browser and make some changes to the code in your editor to see it live-reloading.

If you want to build the JS bundles for production, run `npm run build` in your terminal and to start a Node.js server just type in `npm start --production`.

### Project Templates

Hops comes with a couple of different project templates you can use with `hops init --template`. If you do not explicitly select one, `hops init` defaults to `hops-template-react`.

| Package                                                                                     | NPM                                                                                                                   |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [Hops Template Minimal](https://github.com/xing/hops/tree/master/packages/template-minimal) | [![npm](https://img.shields.io/npm/v/hops-template-minimal.svg)](https://www.npmjs.com/package/hops-template-minimal) |
| [Hops Template React](https://github.com/xing/hops/tree/master/packages/template-react)     | [![npm](https://img.shields.io/npm/v/hops-template-react.svg)](https://www.npmjs.com/package/hops-template-react)     |
| [Hops Template GraphQL](https://github.com/xing/hops/tree/master/packages/template-graphql) | [![npm](https://img.shields.io/npm/v/hops-template-graphql.svg)](https://www.npmjs.com/package/hops-template-graphql) |

### General Usage

Hops is quite modular, its components being independently published on npm. Its main building blocks, however, rely upon each other:

| Package                                                                             | NPM                                                                                                           |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Hops React](https://github.com/xing/hops/tree/master/packages/react)               | [![npm](https://img.shields.io/npm/v/hops-react.svg)](https://www.npmjs.com/package/hops-react)               |
| [Hops Redux](https://github.com/xing/hops/tree/master/packages/redux)               | [![npm](https://img.shields.io/npm/v/hops-redux.svg)](https://www.npmjs.com/package/hops-redux)               |
| [Hops GraphQL](https://github.com/xing/hops/tree/master/packages/graphql)           | [![npm](https://img.shields.io/npm/v/hops-graphql.svg)](https://www.npmjs.com/package/hops-graphql)           |
| [Hops Express](https://github.com/xing/hops/tree/master/packages/express)           | [![npm](https://img.shields.io/npm/v/hops-express.svg)](https://www.npmjs.com/package/hops-express)           |
| [Hops Lambda](https://github.com/xing/hops/tree/master/packages/lambda)             | [![npm](https://img.shields.io/npm/v/hops-lambda.svg)](https://www.npmjs.com/package/hops-lambda)             |
| [Hops Global CLI](https://github.com/xing/hops/tree/master/packages/cli)            | [![npm](https://img.shields.io/npm/v/hops-cli.svg)](https://www.npmjs.com/package/hops-cli)                   |
| [Hops Local CLI](https://github.com/xing/hops/tree/master/packages/local-cli)       | [![npm](https://img.shields.io/npm/v/hops-local-cli.svg)](https://www.npmjs.com/package/hops-local-cli)       |
| [Hops Build](https://github.com/xing/hops/tree/master/packages/build)               | [![npm](https://img.shields.io/npm/v/hops-build.svg)](https://www.npmjs.com/package/hops-build)               |
| [Hops Config](https://github.com/xing/hops/tree/master/packages/config)             | [![npm](https://img.shields.io/npm/v/hops-config.svg)](https://www.npmjs.com/package/hops-config)             |
| [Hops Build Config](https://github.com/xing/hops/tree/master/packages/build-config) | [![npm](https://img.shields.io/npm/v/hops-build-config.svg)](https://www.npmjs.com/package/hops-build-config) |
| [Hops Jest Preset](https://github.com/xing/hops/tree/master/packages/jest-preset)   | [![npm](https://img.shields.io/npm/v/jest-preset-hops.svg)](https://www.npmjs.com/package/jest-preset-hops)   |

The following additional packages are rather low-level and you'll probably never need to install and use them directly.

| Package                                                                         | NPM                                                                                                       |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Hops Server](https://github.com/xing/hops/tree/master/packages/server)         | [![npm](https://img.shields.io/npm/v/hops-server.svg)](https://www.npmjs.com/package/hops-server)         |
| [Hops Middleware](https://github.com/xing/hops/tree/master/packages/middleware) | [![npm](https://img.shields.io/npm/v/hops-middleware.svg)](https://www.npmjs.com/package/hops-middleware) |
| [Hops Webpack Plugin](https://github.com/xing/hops/tree/master/packages/plugin) | [![npm](https://img.shields.io/npm/v/hops-plugin.svg)](https://www.npmjs.com/package/hops-plugin)         |
| [Hops Renderer](https://github.com/xing/hops/tree/master/packages/renderer)     | [![npm](https://img.shields.io/npm/v/hops-renderer.svg)](https://www.npmjs.com/package/hops-renderer)     |
| [Hops Transpiler](https://github.com/xing/hops/tree/master/packages/transpiler) | [![npm](https://img.shields.io/npm/v/hops-transpiler.svg)](https://www.npmjs.com/package/hops-transpiler) |

### Contributing

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

### Alternatives

* [Razzle](https://github.com/jaredpalmer/razzle)
* [Next](https://github.com/zeit/next.js/)
* [Gatsby](https://github.com/gatsbyjs/gatsby)
* [Backpack](https://github.com/palmerhq/backpack)
* [Create React App](https://github.com/facebookincubator/create-react-app)

### Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
