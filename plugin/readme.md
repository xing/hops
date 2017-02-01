
# Hops Middleware

Hops assumes you will write an Express-style middleware, transpiles it and makes it easy to use in non-transpiled and even non-server code. Hops' plugin is a simple helper to simplify using your custom middleware in a webpack build.

You can override hops' default configuration by passing a config object to the `Plugin` constructor. Supported config options equal those supported in `package.json`.


### Example

This example shows how to write and configure a custom middleware and use it in a webpack plugin that will generate two html files (`foo/index.html` and `bar/index.html`) in the webpack output folder.


##### `package.json`

```javascript
{
  ...
  "server": "src/server.js",
  "hops": {
    "locations": [
      "/foo",
      "/bar"
    ]
  }
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
}
```

##### `webpack.config.js`

```javascript
const HopsPlugin = require('hops/plugin');

module.exports = {
  ...
  plugins: [
    new HopsPlugin(/* hopsConfig, watchOptions */)
  ]
  ...
}
```
