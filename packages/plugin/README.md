# Hops Plugin

[![npm](https://img.shields.io/npm/v/hops-plugin.svg)](https://www.npmjs.com/package/hops-plugin)

Hops assumes you will write an Express-style middleware, transpiles it and makes it easy to use in non-transpiled and even non-server code. Hops' plugin is a simple helper to simplify using your custom middleware in a Webpack build.

You can override hops' default Webpack configuration by passing a config object to the `Plugin` constructor. Supported config options equal those supported in `package.json`.

### Target Audience

If you want to use your Webpack build to generate static pages using your own custom Express middleware, written in ECMAScript and transpiled using Webpack, this plugin might be what you're looking for. Phew.

### Example

This example shows how to write and configure a custom middleware and use it in a webpack plugin that will generate two html files (`foo/index.html` and `bar/index.html`) in the webpack output folder.

##### `package.json`

```javascript
{
  ...
  "server": "src/server.js"
  ...
}
```

##### `src/server.js`

```javascript
export default (req, res) => {
  switch (req.url) {
    case '/foo':
      res.write('hello foo');
      break;
    case '/bar':
      res.write('hello bar');
      break;
    default:
      res.writeHead(404);
      res.write('not found');
      break;
  }
  res.end();
};
```

##### `webpack.config.js`

```javascript
const HopsPlugin = require('hops-plugin');
const webpackConfig = require('hops-build-config').nodeConfig;

const locations = ['foo', 'bar'];

module.exports = {
  ...
  plugins: [
    new HopsPlugin(locations, webpackConfig /*, watchOptions */)
  ]
  ...
}
```
