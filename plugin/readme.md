
# Hops Webpack Plugin

With hops, your project is set up to render static pages (or [app shells](https://www.youtube.com/watch?v=m2tvYGCdOzs)) using your React components. This feature is implemented using a custom Webpack plugin.

```javascript
var HopsPlugin = require('hops/plugin');

module.exports = {
  //...
  plugins: [
    new HopsPlugin()
  ]
};
```

The plugin's constructor takes a single options object as an argument, which is also passed along to the template. The supported options are documented below.


### Options

##### `locations: Array<string>`

Array of location strings (i.e. http paths) to be 'requested' by the static site generation process. These must correspond to paths registered in your ReactRouter instance. Defaults to `['/']`.

##### `template: string`

Full path to an [EJS](http://ejs.co) template file that should at least have the outlets found in hops' [default](https://github.com/xing/hops/blob/master/plugin/template.ejs).

##### `config: string`

Full path to the webpack config file for a node build environment. Defaults to `hops/etc/webpack.node.js`.

##### `chunkPrefix: string`

Filename prefix to identify non-entry chunks. Defaults to `chunk-` in accordance with hops' webpack configs.
