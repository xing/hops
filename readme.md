
<p align="center">
  <img
    width="200"
    height="200"
    src="https://github.com/xing/hops/blob/master/logo.png?raw=true"
  />
</p>

<h1 align="center">Hops UI Toolbox</h1>

<div class=highlight><p align="center">
  <b>Highly experimental - use at your own peril. Things <i>will</i> break.</b>
</p></div><p>&nbsp;</p>

In this repo, we are experimenting with technology that might serve as our next
generation front end technology stack: hops spices our brew (i.e. web front end)
with ECMAScript, CSSModules, JSX/React and Flux/Redux. To get an impression take
a look at our [example app](https://github.com/xing/hops/tree/master/app).

### Install

```
npm install -SE hops
```

### Configure

**package.json**

```
{
  ...
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

### Run

```
npm start (--production)
```

#### Thanks!

The beautiful hops icon we are using instead of a logo was created by
[The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via
[The Noun Project](https://thenounproject.com/term/hops/9255/). It is licensed
under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/)
license.
