# Hops Config

[![npm](https://img.shields.io/npm/v/hops-config.svg)](https://www.npmjs.com/package/hops-config)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a package that exposes your applications configuration and is mostly here for legacy reasons. It has thus been [deprecated](../../DEPRECATIONS.md#dep0001) as of version 12 of Hops and will be removed with the next major release.

Please use [`withConfig`](../../DOCUMENTATION.md#withconfigcomponent) or [`useConfig`](../../DOCUMENTATION.md#useconfig-config) to access the configuration inside your application's React components.

Inside [mixins](https://github.com/untool/untool/tree/master/packages/core#mixins) you can access the config through `this.config`.

### Installation

Add this package as a dependency to your project:

```bash
npm install --save hops-config
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### Usage

`import` / `require` this package to access the configuration that you are interested in.

```javascript
import config from 'hops-config';

console.log(config.basePath);
```
