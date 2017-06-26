
# Hops Middleware

Hops assumes you will write an Express-style middleware, transpiles it using Webpack and makes it easy to use in non-transpiled and even non-server code. Hops' middleware is a simple helper to simplify using your custom middleware with an Express server.

You can override hops' default Webpack configuration by passing a `webpackConfig` object to the `createMiddleware` function. You can also enable watch mode by passing a `watchOptions` object.


### Target Audience

If you want to write your Express middleware in ECMAScript Next, reuse your Webpack loader config and have your stuff transpiled on the fly to use it in your own Express server (or in Webpack Dev Server), hops' middleware is for you.


### Example

This example shows how to write and configure a custom middleware and use it in a stock Express server.


##### `package.json`

```javascript
{
  ...
  "server": "src/server.js",
  "main": "index.js",
  "dependencies": {
    "babel-preset-es2015": "*",
    "hops": "*"
  },
  "babel": {
    "presets": [
      "es2015"
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

##### `index.js`

```javascript
const express = require('express');
const createMiddleware = require('hops/middleware');
const webpackConfig = require('hops/config/render');

const app = express();

app.use(express.static('dist'));

app.all('*', createMiddleware(webpackConfig /*, watchOptions */));

app.listen(3000);
```

Hops' own [renderer](https://github.com/xing/hops/blob/master/packages/renderer/index.js) is one example of the middleware in action.
