## Hops Core - Modules Overview

Hops can be split at least into the Tooling and the Runtime section. This is an idea of how the individual, non optional components look like:

![Hops Core](./hops-core.png)

## Modules Reference

When you first look at Hops you see the CLI project [Hops (CLI)](https://github.com/xing/hops/tree/master/packages/cli). This is what you might call the core of hops.

Hops is modular and its components are independently published on npm. Its main building blocks, however, rely upon each other:

| Package                                                                             | NPM                                                                                                           |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Hops (CLI)](https://github.com/xing/hops/tree/master/packages/cli)                 | [![npm](https://img.shields.io/npm/v/hops.svg)](https://www.npmjs.com/package/hops-cli)                       |
| [Hops React](https://github.com/xing/hops/tree/master/packages/react)               | [![npm](https://img.shields.io/npm/v/hops-react.svg)](https://www.npmjs.com/package/hops-react)               |
| [Hops Redux](https://github.com/xing/hops/tree/master/packages/redux)               | [![npm](https://img.shields.io/npm/v/hops-redux.svg)](https://www.npmjs.com/package/hops-redux)               |
| [Hops GraphQL](https://github.com/xing/hops/tree/master/packages/graphql)           | [![npm](https://img.shields.io/npm/v/hops-graphql.svg)](https://www.npmjs.com/package/hops-graphql)           |
| [Hops Express](https://github.com/xing/hops/tree/master/packages/express)           | [![npm](https://img.shields.io/npm/v/hops-express.svg)](https://www.npmjs.com/package/hops-express)           |
| [Hops Lambda](https://github.com/xing/hops/tree/master/packages/lambda)             | [![npm](https://img.shields.io/npm/v/hops-lambda.svg)](https://www.npmjs.com/package/hops-lambda)             |
| [Hops Build](https://github.com/xing/hops/tree/master/packages/build)               | [![npm](https://img.shields.io/npm/v/hops-build.svg)](https://www.npmjs.com/package/hops-build)               |
| [Hops Config](https://github.com/xing/hops/tree/master/packages/config)             | [![npm](https://img.shields.io/npm/v/hops-config.svg)](https://www.npmjs.com/package/hops-config)             |
| [Hops Build Config](https://github.com/xing/hops/tree/master/packages/build-config) | [![npm](https://img.shields.io/npm/v/hops-build-config.svg)](https://www.npmjs.com/package/hops-build-config) |
| [Hops Jest Preset](https://github.com/xing/hops/tree/master/packages/jest-preset)   | [![npm](https://img.shields.io/npm/v/jest-preset-hops.svg)](https://www.npmjs.com/package/jest-preset-hops)   |
