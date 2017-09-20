# Hops CLI

hops-cli provides a small set of commands to manage your hops project. Installing hops-cli is the minimum requirement for being able to start working with Hops.

# Installation
## Minimum installation for any project
We assume that you already created a folder for your project and initialized it with `npm init -y`. Go to the root folder of your project and install hops-cli. This installs hops-config and hops-server as dependencies as well:
``` bash
npm install --save hops-cli
```

That's it - at least this is sufficient to get you started with a very basic setup.

## Additional setup for a React project
In case you are going to implement a project with React, you need to install further packages:
``` bash
npm install --save react react-dom react-helmet react-router react-router-dom hops-react
```

# Usage
## Available commands
The following commands are provided by hops-cli: 

- `hops build` - initiates a project build
- `hops develop` - starts a Webpack development server
- `hops serve` - initiates a project build, stores the build artifacts in the file system and starts a production (Express) server
- `hops start` - if NODE_ENV is set to production, this runs `hops serve`. Otherwise, `hops develop` gets executed

Please note that hops-cli is not meant to be called directly, but rather to be added to your project's package.json file and then called indirectly by using npm or yarn (see below).

## Configure package.json
To actually use the hops-cli commands, you have to add them to the scripts section of your project's package.json. Hops is designed to leverage npm/yarn features, so it does not make much sense to call the hops executable directly.

``` JSON
  "scripts": {
    "build": "hops build",
    "develop": "hops develop",
    "serve": "hops serve",
    "start": "hops start"
  },
  "config": {
    "hops": {}
  }
```

However, for simple projects, it should be sufficient to just add `"start": "hops start"` here.

To learn what configuration options are supported, please see the [`hops-config` docs](https://github.com/xing/hops/tree/master/packages/config#hops-config).

## Static mode
hops-cli can be used as a static site generator, too. To enable static mode, pass `--static` or `-s` to the above commands and configure a `locations` array to your package.json file.

``` JSON
  "scripts": {
    "start": "hops start --static"
  },
  "config": {
    "hops": {
      "locations": ["/"]
    }
  }
```

## Use via npm
After that, you can execute them via npm like so:

``` bash
npm run build
npm run develop
npm run serve
npm start
npm start --production 
```

## Very basic example app
To try out the [minimum installation described above](#minimum-installation-for-any-project), create an index.js file in the root folder of your project and put the following code in there:

``` js
export default function (req, res, next) {
  if (req) {
    console.log('server');
    if (req.path === '/') {
      res.set('Content-Type', 'text/html');
      res.send('<script src="/main.js"></script>');
    } else {
      next();
    }
  } else {
    console.log('browser');
  }
}

```

Don't forget to [configure the scripts section](#configure-packagejson) of your package.json. And you're done!
