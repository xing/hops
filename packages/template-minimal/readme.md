# Hops Template Minimal

This is a minimal example of how [hops](https://github.com/xing/hops) can be used without react.


## Target audience

You might want to use this if you plan to use something other than react, for example when you want to build a vue.js or preact application - or if you disagree with / want to make more extensive customizations than those done in [hops-react](https://github.com/xing/hops/tree/master/packages/react) and [hops-redux](https://github.com/xing/hops/tree/master/packages/redux).


## Overview

#### browser.js

This script (and all of its dependencies) will be bundled through webpack into the `main-[hash].js` bundle located at [hops-config](https://github.com/xing/hops/tree/master/packages/config)s `buildDir`.

It will then be requested by the browser because the [server](#server.js) embeds it into the intial HTML response.


#### server.js

This script (and all of its dependencies) will be bundled through webpack into the `server.js` bundle located at [hops-config](https://github.com/xing/hops/tree/master/packages/config)s `cacheDir`.

It will then be used as a Express.js-style middleware for [hops-express](https://github.com/xing/hops/tree/master/packages/express) and the `webpack-dev-server` contained in [hops-build](https://github.com/xing/hops/tree/master/packages/build).
