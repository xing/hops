
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
    <img src="https://travis-ci.org/xing/hops.svg?branch=master">
  </a>
</p>
<p>&nbsp;</p>

Hops is a modular development and build environment for universal ("isomorphic") web applications. It leverages [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org).

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


### Installation

Besides reasonably recent versions of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com), hops has no global dependencies. If you need those, we recommend using [nvm](https://github.com/creationix/nvm) or similar.

Install the `hops-cli` globally via npm `npm install --global hops-cli` or yarn `yarn global add hops-cli`:


### Project creation

`hops init my-project` will create a directory called `my-project` and initialize an example react project inside it.


### Configuration

Hops is configured via the `package.json`s `"config"` field (read more about it at [hops-config](https://github.com/xing/hops/tree/master/packages/config):

```javascript
{
  "browser": "src/browser.js",
  "server": "src/server.js",
  "scripts": {
    "start": "hops start"
  },
  "config": {
    "hops": {
      "locations": [
        "/"
      ]
    }
  }
}
```

Hops relies heavily on this file for configuration. In the example above, there are two entry points for `browser` and `server` - that is, two files that are used for client and server builds.

Hops provides a runner that you can call from the scripts of your `package.json` and is configured using the `hops` config object also contained therein. In this example, the only configuration option provided is `locations`, an array of paths that will be used for generating static html files using the middleware you provide.


### Running

For developing using hops, you can use any decent editor with up-to-date language support. Those without a favorite we recommend [Atom](https://atom.io), probably with the [linter](https://atom.io/packages/linter), [linter-eslint](https://atom.io/packages/linter-eslint) and [linter-stylelint](https://atom.io/packages/linter-stylelint) plugins.

Assuming you edited your `package.json` as outlined above, you can fire up a dev or production server like so:

```shell
npm start (--production)
```

If called with the `--production` flag, a production mode server is launched. Otherwise, a development server featuring hot module replacement is started. Hops can generate html pages for all `locations` listed in its config at build time, so you don't need a node server in production, but still can enjoy the benefits of a true universal JavaScript application.


### Advanced Usage

Hops is quite modular, its component being independently published on npm. Its main building blocks, however, rely upon each other:

* [Hops Build](https://github.com/xing/hops/tree/master/packages/build)
* [Hops Build Config](https://github.com/xing/hops/tree/master/packages/build-config)
* [Hops Global CLI](https://github.com/xing/hops/tree/master/packages/cli)
* [Hops Config](https://github.com/xing/hops/tree/master/packages/config)
* [Hops Express](https://github.com/xing/hops/tree/master/packages/express)
* [Hops Jest Preset](https://github.com/xing/hops/tree/master/packages/jest-preset)
* [Hops Local CLI](https://github.com/xing/hops/tree/master/packages/local-cli)
* [Hops React](https://github.com/xing/hops/tree/master/packages/react)
* [Hops Redux](https://github.com/xing/hops/tree/master/packages/redux)

The following additional packages are rather low-level and you'll probably never need to install and use them directly.

* [Hops Middleware](https://github.com/xing/hops/tree/master/packages/middleware)
* [Hops Webpack Plugin](https://github.com/xing/hops/tree/master/packages/plugin)
* [Hops Renderer](https://github.com/xing/hops/tree/master/packages/renderer)
* [Hops Server](https://github.com/xing/hops/tree/master/packages/server)
* [Hops Transpiler](https://github.com/xing/hops/tree/master/packages/transpiler)


### Contributing

Hops uses [lerna](https://github.com/lerna/lerna) and [yarn](https://yarnpkg.com/en/) for development and publishing of the packages. Therefore it is required to have `yarn` globally available.

If you want to contribute to this project, create a fork of its [repository](https://github.com/xing/hops/fork) using the GitHub UI. Check out your new fork to your computer:

``` bash
mkdir hops && cd $_
git clone git@github.com:user/hops.git .
```

Afterwards, you can `yarn install` the required dependencies and then run `yarn bootstrap` to install the dependencies of all packages and link the packages together.

Using `yarn start` will execute the `start` script in the [hops-template-react](https://github.com/xing/hops/template-react) so that you can verify your changes in the browser.

When you are finished, please do go ahead and create a [pull request](https://help.github.com/articles/creating-a-pull-request/).

Hops is entirely written in ECMAScript 5 and adheres to [semistandard](https://github.com/Flet/semistandard) code style. Please make sure your contribution does, too.


### Alternatives

* [Next](https://github.com/zeit/next.js/)
* [Gatsby](https://github.com/gatsbyjs/gatsby)
* [Backpack](https://github.com/palmerhq/backpack)
* [Create React App](https://github.com/facebookincubator/create-react-app)


### Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
