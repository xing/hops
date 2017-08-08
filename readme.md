
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


### Installation

Besides reasonably recent versions of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com), hops has no global dependencies. If you need those, we recommend using [nvm](https://github.com/creationix/nvm) or similar.

If you want to go all in with hops, here's what you have to do and install to create a basic project..:

```shell
mkdir foo && cd foo
npm init -y
npm install -S hops-cli hops-config \
  hops-react react react-dom react-helmet react-router react-router-dom \
  hops-redux redux redux-thunk react-redux
```


### Setup

After installing hops into your project, you need to set it up. This can be done within your project's `package.json` file. The relevant fields are shown below:

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

Assuming you edited your `package.json` as outlined above, you can fire up a dev server or trigger a production build like so:

```shell
npm start (--production)
```

If called with the `--production` flag, a production mode server is launched. Otherwise, a development server featuring hot module replacement is started. Hops can generate html pages for all `locations` listed in its config at build time, so you don't need a node server in production, but still can enjoy the benefits of a true universal JavaScript application.


### Advanced Usage

Hops is quite modular, its component being independently published on npm. Its main building blocks, however, rely upon each other:

* [Hops CLI](https://github.com/xing/hops/tree/master/packages/cli)
* [Hops Config](https://github.com/xing/hops/tree/master/packages/config)
* [Hops Jest Preset](https://github.com/xing/hops/tree/master/packages/jest-preset)
* [Hops React](https://github.com/xing/hops/tree/master/packages/react)
* [Hops Redux](https://github.com/xing/hops/tree/master/packages/redux)

The following additional packages are rather low-level and you'll probably never need to install and use them directly.

* [Hops Transpiler](https://github.com/xing/hops/tree/master/packages/transpiler)
* [Hops Middleware](https://github.com/xing/hops/tree/master/packages/middleware)
* [Hops Renderer](https://github.com/xing/hops/tree/master/packages/renderer)
* [Hops Webpack Plugin](https://github.com/xing/hops/tree/master/packages/plugin)


### Contributing

If you want to contribute to this project, create a fork of its [repository](https://github.com/xing/hops/fork) using the GitHub UI. Check out your new fork to your computer:

``` bash
mkdir hops && cd $_
git clone git@github.com:user/hops.git .
```

Afterwards, you can `npm install` Hops' own dev dependencies and start the included demo project and begin developing.

``` bash
npm install
npm start
```

Whenever you run ```npm start```, the hops packages used in the demo project are being re-installed locally. When you are finished, please do go ahead and create a [pull request](https://help.github.com/articles/creating-a-pull-request/).

Hops is entirely written in ECMAScript 5 and adheres to [semistandard](https://github.com/Flet/semistandard) code style. Please make sure your contribution does, too.


### Alternatives

* [Next](https://github.com/zeit/next.js/)
* [Gatsby](https://github.com/gatsbyjs/gatsby)
* [Backpack](https://github.com/palmerhq/backpack)


### Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
