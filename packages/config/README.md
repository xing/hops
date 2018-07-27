# Hops Config

[![npm](https://img.shields.io/npm/v/hops-config.svg)](https://www.npmjs.com/package/hops-config)

This is a package that exposes your applications configuration and is mostly here for legacy reasons.

In the future we will deprecate this package and provide a [React context provider](https://reactjs.org/docs/context.html) to access the configuration inside your applications React components.

Inside [mixins](https://github.com/untool/untool/tree/master/packages/core#mixins) you can access the config through `this.config`.

### Installation

Add this package as a dependency to your project:

```bash
$ yarn add hops-config@next
# OR npm install --save hops-config@next
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/wip-docs-next#quick-start)

### Usage

`import` / `require` this package to access the configuration that you are interested in.

```javascript
import config from 'hops-config';

console.log(config.basePath);
```
