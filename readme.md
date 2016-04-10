
<p align="center"><img width="200" height="200" src="https://github.com/xing/hops/blob/master/logo.png?raw=true" alt="logo"></p>

<h1 align="center">Hops UI Toolbox</h1>

<p align="center">:zap:<b>Highly experimental - use at your own peril. Things <i>will</i> break.</b>:zap:</p><p>&nbsp;</p>

In this repo, we are experimenting with technology that might serve as our next
generation front-end technology stack. To get an impression, take a look at our
[example app](https://github.com/xing/hops/tree/master/app);

## Install Hops

```
npm install -SE hops
```

## Configure Project

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

## Configure Linters (optional)

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

#### Thanks!

The beautiful hops icon we are using as our logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9255/). It was licensed under the [Creative Commons BY 3.0 US](http://creativecommons.org/licenses/by/3.0/us/) license.
