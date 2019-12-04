# Create Hops App

[![npm](https://img.shields.io/npm/v/create-hops-app.svg)](https://www.npmjs.com/package/create-hops-app)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This package provides a binary (`create-hops-app`) that can be used to create Hops applications.

## Bootstrap a Hops app

The recommended ways bootstrapping hops apps are either trough [`yarn create`](https://yarnpkg.com/lang/en/docs/cli/create/) or [`npx`](https://www.npmjs.com/package/npx).

Bootstrap using yarn create:

```bash
yarn create hops-app my-new-hops-project
```

Bootstrap using npx:

```bash
npx create-hops-app my-new-hops-project
```

## Usage

```bash
yarn create hops-app my-new-hops-project [--verbose] [--npm] [--template hops-template-*]
```

This will create a very basic hops example project that is ready to go.

The following arguments are optional:

- `--verbose` - to increase the verbosity of the output for debugging purposes
- `--npm` - to force usage of `npm` instead of `yarn` even if yarn is available
- `--template` - to specify a different template for the intial structure. available templates:
  - [hops-template-react](https://github.com/xing/hops/tree/master/packages/template-react)
  - [hops-template-redux](https://github.com/xing/hops/tree/master/packages/template-redux)
  - [hops-template-graphql](https://github.com/xing/hops/tree/master/packages/template-graphql)

Then `cd` into `my-new-hops-project` and execute `yarn hops --help` or `npx hops --help` again to see a list of supported commands.
