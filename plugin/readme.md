
# Hops Webpack Plugin

With hops, your project is set up to render static pages (or [app shells](https://www.youtube.com/watch?v=m2tvYGCdOzs)). This feature is implemented using a custom Webpack plugin.


### Example

```javascript
const HopsPlugin = require('hops/plugin');

module.exports = {
  //...
  plugins: [
    new HopsPlugin()
  ]
};
```
