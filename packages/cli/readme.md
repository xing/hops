# Hops CLI

hops-cli provides a small set of commands to manage your hops project. Installing hops-cli is the minimum requirement for being able to start working with Hops.

# Installation
## Minimum installation for any project
We assume that you already created a folder for your project and initialized it with `npm init`. Go to the root folder of your project and install hops-cli. This installs hops-config and hops-server as dependencies as well:
``` bash
npm install --save hops-cli
```

That's it - at least this is sufficient to get you started with a very basic setup.

## Additional setup for a React project
In case you are going to implement a project with React, you need to install further packages:
``` bash
npm install --save react react-router-dom hops-react
```

# Usage
## Available commands
The following commands are provided by hops-cli: 

- `hops build` - initiates a project build
- `hops develop` - starts a Webpack development server
- `hops serve` - initiates a project build, stores the build artifacts in the file system and starts a production (Express) server
- `hops start` - if NODE_ENV is set to production, this runs `hops serve`. Otherwise, `hops develop` gets executed
- `hops start --production` - this overrides the NODE_ENV setting and runs `hops serve`

## Configure package.json
To actually use the hops-cli commands, you have to add them to the scripts section of your project's package.json:

``` JSON
"scripts": {
    "build": "hops build",
    "develop": "hops develop",
    "serve": "hops serve",
    "start": "hops start"
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
To try out the [minimum installation described above](#minimum-installation-for-any-project), create a main.js file in the root folder of your project and put the following code in there:

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

After that, define main.js as entry point of your app in the package.json's `main` field:

``` js
"main": "main.js"
```

Don't forget to [configure the scripts section](#configure-package.json) of your package.json. And you're done!