
<p align="center">
  <img
    width="200"
    height="217"
    src="https://github.com/xing/hops/blob/master/logo.png?raw=true"
  />
</p>

<h1 align="center">Hops Universal Build Tool</h1>

<p align="center">
  <a href="https://travis-ci.org/xing/hops">
    <img src="https://travis-ci.org/xing/hops.svg?branch=master">
  </a>
  <a href="https://david-dm.org/xing/hops">
    <img src="https://david-dm.org/xing/hops.svg">
  </a>
</p>
<p>&nbsp;</p>

Hops is a universal [Webpack](https://webpack.js.org) wrapper. It additionally leverages both [Babel](https://babeljs.io) and [PostCSS](http://postcss.org). On the one hand, hops is designed to simplify getting started with modern frontend tooling by providing an extensible baseline config for Webpack. On the other hand, hops aims to help with using webpack for code running on servers.


### Installation

Besides reasonably recent versions of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com), hops has no global dependencies. If you need those, we recommend using [nvm](https://github.com/creationix/nvm) or similar.

```shell
mkdir foo && cd foo
npm init -y
npm install -SE hops
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
  "dependencies": {
    "hops": "*"
  },
  "hops": {
    "locations": [
      "/"
    ]
  },
  "babel": {},
  "postcss": {}
}
```

Hops relies heavily on this file for configuration. In the example above, there are two entry points for `browser` and `server` - that is, two files that are used for client and server builds. Using two separate files is not strictly required, but it usually makes sense, as you'll have to export an [Express](http://expressjs.com/en/guide/using-middleware.html)-compatible middleware function for server side usage, while for the client, you only need to export a function that intializes your client application.

Hops provides a runner that you can call from the scripts of your `package.json` and is configured using the `hops` object also contained therein. In this example, the only configuration option provided is `locations`, an array of paths that will be used for generating static html files using the middleware you provide.

Additionally, you can configure [Babel](https://babeljs.io/docs/usage/babelrc/) and [PostCSS](https://github.com/postcss/postcss-loader) using the appropriate fields in `package.json` - or whatever other method these projects provide.


### Running

For developing with hops, you can use any decent editor with up-to-date language support. Those without a favorite we recommend [Atom](https://atom.io), probably with the [linter](https://atom.io/packages/linter), [linter-eslint](https://atom.io/packages/linter-eslint) and [linter-stylelint](https://atom.io/packages/linter-stylelint) plugins.

```shell
npm start (--production)
```

If called with the `--production` flag, a static build is initialized. Otherwise, a development server featuring hot module replacement is started. Hops generates html pages for all `locations` listed in its config at build time, so you don't need a node server in production, but still can enjoy the benefits of a true universal JavaScript application.

If, however, you want to serve dynamically generated pages, you can transpile your middleware on the fly by using hops' factory function like so:

```javascript
const express = require('express');
const createMiddleware = require('hops/middleware');

const app = express();

app.use(express.static('dist'));

app.all('*', createMiddleware());

app.listen(3000);
```

### Advanced Usage

Using the hops config in your `package.json` file, you can supply your own Webpack configuration files.

```javascript
{
  "hops": {
    "webpack": {
      "build": "/path/to/your/build/config",
      "develop": "/path/to/your/development/config",
      "render": "/path/to/your/server/side/rendering/config"
    }
  }
}
```

Other than that, you can use hops' components on their own. Please refer to their respective readme files:

* [Hops Webpack Plugin](https://github.com/xing/hops/tree/master/plugin)
* [Hops Renderer](https://github.com/xing/hops/tree/master/renderer)
* [Hops Middleware](https://github.com/xing/hops/tree/master/middleware)
* [Hops Transpiler](https://github.com/xing/hops/tree/master/transpiler)


### Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
