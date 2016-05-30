
# Hops Webpack Plugin

With hops, your project is set up to render static pages (or [app shells](https://www.youtube.com/watch?v=m2tvYGCdOzs)) using your React components. This feature is implemented using a custom Webpack plugin.

```javascript
var HopsPlugin = require('hops/plugin');

module.exports = {
  //...
  plugins: [
    new HopsPlugin({
      entry: require.resolve('hops/shims/node'),
      main: './'
    })
  ]
};
```

The plugin's constructor takes a single options object as an argument. The supported options are documented below.


### Options

##### `entry: string (required)`

Full path to the path to the node entry file. This is usually *not* your application's actual entry point, but rather a shim to make your app play nicely with static page generation.

##### `main: string (required)`

Full path to your application's main entry point. May be a module, i.e. directory path. This module is expected to export the result of a `hops.render` function call.

##### `template: string`

Full path to an [EJS](http://ejs.co) template file that should at least have the outlets found in hops' [default](https://github.com/xing/hops/blob/master/plugin/template.ejs).

##### `babelIgnore: RegExp`

A regular expression that prevents Babel from processing folders containing only ES3/5 code. Defaults to `/node_modules\//`.

##### `localIdentName: string`

A string template used for css modules' namespacing. Defaults to `[path][name]-[local]-[hash:base64:5]`.


### Example

```javascript
var HopsPlugin = require('hops/plugin');

module.exports = {
  entry: require.resolve('hops/shims/browser'),
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules\//
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&localIdentName=[name]-[local]-[hash:base64:5]'
      ]
    }]
  },
  resolve: {
    alias: {
      'hops-main': './src/foo'
    }
  },
  plugins: [
    new HopsPlugin({
      entry: require.resolve('hops/shims/node'),
      main: './src/bar'
    })
  ]
};
```
