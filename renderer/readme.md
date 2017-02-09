
# Hops Renderer

Hops assumes you will write an Express-style middleware, transpiles it and makes it easy to use in non-transpiled and even non-server code. Hops' renderer is a simple helper to enable you to use your custom middleware outside of Express servers.

Its export, `createRenderer`, creates a `render` function that, if called with a `location` string, returns a promise that resolves to the full body of your middleware's response.

You can override hops' default Webpack configuration by passing a config object to the `createRenderer` function. You can also enable watch mode by passing a `watchOptions` object.


### Target Audience

If you want to use a custom Express middleware that's written in ECMAScript Next and transpiled reusing your Webpack loader config, to generate HTML output during your build, you might want to use this renderer. This way, you can prerender some of your pages at buildtime while using the very same code to dynamically generate other pages at runtime.


### Example

This example shows how to write and configure a custom middleware and use it to prerender pages in a build script of some sort.


##### `package.json`

```javascript
{
  ...
  "server": "src/server.js",,
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

##### `srcipts/render.js`

```javascript
const createRenderer = require('hops/renderer');
const render = createRenderer(/* webpackConfig, watchOptions */);

render('/foo').then(function (result) {
  // result === 'hello foo'
});

render('/baz').catch(function (error) {
  // error === new Error('invalid status code: 404')
});
```

Hops' own [Webpack plugin](https://github.com/xing/hops/blob/master/plugin/index.js) is another example of its renderer in action.
