
# Hops Middleware

Hops assumes you will write an Express-style middleware, transpiles it and makes it easy to use in non-transpiled and even non-server code. Hops' middleare is a simple helper to simplify using your custom middleware with an Express server.

You can override hops' default configuration by passing a config object to the `createMiddleware` function. Supported config options equal those supported in `package.json`.


### Example

This example shows how to write and configure a custom middleware and use it in a stock Express server.


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
}
```

##### `index.js`

```javascript
const express = require('express');
const createMiddleware = require('hops/middleware');

const app = express();

app.use(express.static('dist'));

app.all('*', createMiddleware(/* hopsConfig, watchOptions */));

app.listen(3000);
```
