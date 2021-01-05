# Hops Debug

[![npm](https://img.shields.io/npm/v/hops-debug.svg)](https://www.npmjs.com/package/hops-debug)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This package proxies the [`debug`](https://www.npmjs.com/package/debug) package from npm and makes it available for server- and client-code.

Read more about how we are using debug in Hops [here](../../DOCUMENTATION.md#debugging).

### Installation

Add this package as a dependency to your project:

```bash
npm install --save hops-debug
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### Usage

`import` / `require` this package to create a debugger:

```javascript
import debugFactory from 'hops-debug';

const debug = debugFactory('my-tag');

debug('something I want to log: %s', 'here is a string');
```

To see the debug output you can start your application with the environment variable `DEBUG=my-tag` set on the command line. \
To see the debug output in the browser console you can set the cookie `hops_debug` to `my-tag`.
