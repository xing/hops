
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

The plugin's constructor takes a single options object as an argument, which is also passed along to the template. These options are also overrideable The supported options are documented below.


### Options

##### `locations: Array<string>`

Array of location strings (i.e. http paths) to be 'requested' by the static site generation process. These must correspond to paths registered in your ReactRouter instance. Defaults to `['/']`.

##### `template: string`

Full path to an [EJS](http://ejs.co) template file that should at least have the outlets found in hops' [default](https://github.com/xing/hops/blob/master/plugin/template.ejs).

##### `config: string`

Full path to the webpack config file for a node build environment. Defaults to `hops/etc/webpack.node.js`.

##### `dll: Array<object>`

Array of dll config objects, each containing a static source file path (`source`) and a public http base base (`path`). Using these, static js/css asset files can be added to your build.

##### `js: Array<string>` and `css: Array<string>`

Array of external asset file urls to be injected into the default html template.
