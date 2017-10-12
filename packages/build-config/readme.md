# Hops Build Config

hops-build-config exposes webpack configurations for Node.js, browser and webpack-dev-server.

# Installation
When you install [hops-build](https://github.com/xing/hops/tree/master/packages/build), hops-build-config will be installed as a dependency as well - so you don't necessarily have to separately install hops-build-config.

However iff you want to use it in your app directly (for example to extend it), install it by running

```
npm install --save hops-build-config
```

# Usage

Please find a list of the default configs below. If you use [hops-config](https://github.com/xing/hops/tree/master/packages/config), too, you can easily [ovewrite / extend](#overwrite-configs-via-packagejson) these configurations.

## Available options
| Field | Type | Description |
|-------|------|-------------|
| `buildConfig` | `String` | Path to your Webpack build configuration file. Defaults to `./node_modules/hops-build-config/configs/build.js` |
| `developConfig` | `String` | Path to your Webpack development configuration file. Defaults to `./node_modules/hops-build-config/configs/develop.js` |
| `nodeConfig` | `String` | Path to your Webpack node/server-side rendering configuration file. Defaults to `./node_modules/hops-build-config/configs/node.js` |


## Custom Webpack configuration
Webpack configurations can be nasty to handle, therefore we recommend using [webpack-merge](https://www.npmjs.com/package/webpack-merge) if you want to extend one of the existing Webpack configurations.

The following example shows how to overwrite / extend the webpack configurations:

#### `package.json`
``` JSON
"name": "my-application",
"version": "1.0.0",
"config": {
    "hops": {
      "buildConfig": "./path-to-my-custom-webpack-config/build.js",
      "developConfig": "./path-to-my-custom-webpack-config/develop.js",
      "nodeConfig": "./path-to-my-custom-webpack-config/node.js"
    }
  }
```

#### `./path-to-my-custom-webpack-config/build.js`
```javascript
var webpack = require('webpack');
var hopsBuildConfig = require('hops-build-config');
var merge = require('webpack-merge');

var myCustomBuildConfig = {
  plugins: [
    new webpack.EnvironmentPlugin({
      'MY_CUSTOM_ENV': 'myFallbackValue'
    })
  ]
};

module.exports = merge.strategy(
  { plugins: 'append' },
  hopsBuildConfig.buildConfig,
  myCustomBuildConfig
);
```
Please head over to the documentation of [webpack-merge](https://www.npmjs.com/package/webpack-merge) to see the full list of merge strategies to find out which one to use.


## Default configuration

hops-build-config provides a minimal, yet convenient default configuration. Furthermore, when starting a development server, source maps will be generated.

### Babel
- [Env preset](http://babeljs.io/docs/plugins/preset-env/)
- [React preset](https://www.npmjs.com/package/babel-preset-react) 
- [flow-react-proptypes](https://www.npmjs.com/package/babel-plugin-flow-react-proptypes) plugin
- [transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties) plugin
- [transform-object-rest-spread](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread) plugin
- [syntax-dynamic-import](https://www.npmjs.com/package/babel-plugin-syntax-dynamic-import) plugin (used in the browser)
- [dynamic-import-node](https://www.npmjs.com/package/babel-plugin-dynamic-import-node) plugin (used on the server)

### PostCSS

PostCSS in Hops is configured to use [cssnext](http://cssnext.io/) and [CSS Modules](https://github.com/css-modules/css-modules) by default.

### Files/assets

| File type | Loader action |
|-----------|---------------|
| `html` `svg` `otf` `ttf` `woff` `woff2` `ico` | Files of these types are emitted to the directory defined in `assetPath` |
| `png` `gif` `jpeg` `jpg` `webp` | Same as above, except when a file of this type is smaller than 10kb in size. In that case, it will be converted to a base64-encoded data URL and embedded inline in the referencing document |
| `json` | Files of this type are loaded and their content is returned |
| `tpl` | Files of this type are parsed by [_.template](https://lodash.com/docs/4.17.4#template) and their content is returned as a function. By providing such a file, you can override the default template provided by [hops-react](https://www.npmjs.com/package/hops-react) |
