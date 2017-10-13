
# Hops Express

hops-express creates a minimal [Express](https://expressjs.com/) server which takes care of serving static assets and registering a middleware built using [hops-build](https://github.com/xing/hops/tree/master/packages/build).

hops-express doesn't generate the middleware itself but assumes that it is named `server.js` inside the `hopsConfig.cacheDir` (see [hops-config](https://github.com/xing/hops/tree/master/packages/config) for more details).


### API

## `createApp()`
`createApp()` creates an Express app, applies all the middleware configuration and returns the app object ready to call `app.listen(host, port)` on it.

## `startServer(callback)`
`startServer()` is a small wrapper around `createApp()` and executes `app.listen()` with the values provided through hops-config.


### Target Audience

This package is intended for users that want to use server-side rendering with hops - be it on your own machine, Heroku, Lambda or anywhere else.

The server contained in this app is meant for production usage. During development, use [hops-build](https://github.com/xing/hops/tree/master/packages/build) directly.


### Example

## `serve.js`
```javascript
var hopsExpress = require('hops-express');

hopsExpress.startServer(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log('server started successfully');
  }
});
```
