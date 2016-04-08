
<p align="center"><img width="200" height="200" src="/logo.png?raw=true" alt="logo"></p>

# Hops UI Toolbox

:zap:**Highly experimental - use at your own peril. Things *will* break.**:zap:

In this repo, we are experimenting with technology that might serve as our next
generation front-end technology stack.

## Install Hops

```
npm i -SE hops
```

## Configure Project

**.eslintrc.js**

```
module.exports = {
  extends: require.resolve('hops/etc/eslint')
}
```

**.stylelintrc.js**

```
module.exports = {
  extends: require.resolve('hops/etc/stylelint')
}
```

**package.json**

```
{
  ...
  "main": "src/main.js",
  "scripts": {
    "start": "hops",
    ...
  },
  "babel": {
    "extends": "hops/etc/babel"
  }
  ...
}
```


## Run Hops

```
npm start (--production)
```


#### Thanks!

The beautiful hops icon we are using as our logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9255/). It was licensed under the [Creative Commons BY 3.0 US](http://creativecommons.org/licenses/by/3.0/us/) license.
