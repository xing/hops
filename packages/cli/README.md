# Hops (CLI)

[![npm](https://img.shields.io/npm/v/hops.svg)](https://www.npmjs.com/package/hops)

This package provides a binary (`hops`) that can be used to create and control Hops applications.

In order to create a new Hops application, it is recommended to install this package either globally (`npm install --global hops` or `yarn global add hops` and then `hops init my-hops-project`) or to use [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) (`npx hops init my-hops-project`).

When the binary is executed outside of a Hops project, it will only expose one command `init` - which can be used to create a new Hops application based on a pre-defined template.

When this binary is executed inside a Hops application it exposes all commands that are provided by the installed Hops dependencies.

## Installation

Install it globally to create a new Hops application.

Or install it locally in an already existing Hops application.

Install it globally via npm:

```bash
npm install --global hops
```

Or yarn

```bash
yarn global add hops
```

Or use `npx`:

```bash
npx hops init ...
```

Install it locally to an existing Hops application:

```bash
npm install --save hops
```

Or:

```bash
yarn add hops
```

## Usage

### Bootstrapping a Project

```bash
hops init my-new-hops-project [--verbose] [--npm] [--template hops-template-*]
```

This will create a very basic hops example project that is ready to go.

The following arguments are optional:

* `--verbose` - to increase the verbosity of the output for debugging purposes
* `--npm` - to force usage of `npm` instead of `yarn` even if yarn is available
* `--template` - to specify a different template for the intial structure. available templates:
  * [hops-template-react](https://github.com/xing/hops/tree/master/packages/template-react)
  * [hops-template-minimal](https://github.com/xing/hops/tree/master/packages/template-minimal)
  * [hops-template-graphql](https://github.com/xing/hops/tree/master/packages/template-graphql)

Then `cd` into `my-new-hops-project` and execute `hops --help` again to see a list of supported commands.

### Available Commands

* `hops build` (provided by [`hops-build`](https://www.npmjs.com/package/hops-build)) - initiates a project build to generate browser and server JS bundles
* `hops develop` (provided by [`hops-build`](https://www.npmjs.com/package/hops-build)) - starts the webpack development server with hot code reloading for fast local iterations
* `hops serve` (provided by [`hops-express`](https://www.npmjs.com/package/hops-express)) - starts a production Node.js Express server using the generated JS bundle from `hops build`
* `hops start` - if NODE_ENV is set to production, this runs `hops build` and `hops serve`. Otherwise `hops develop` is executed.

All commands accept additional arguments:

* `--production` / `-p` - equivalent to setting `NODE_ENV` to `production`
* `--static` / `-s` - to generate static HTML app shells for all configured hops locations.
* `--clean` / `-c` - defaults to `true`, removes the build directory before initiating a build (n/a for `hops serve`)

`hops` only lists commands that are made available by other installed hops packages.

So for example `hops build` and `hops develop` are only available if `hops-build` is installed as a dependency in your project ([`hops-template-react`](https://github.com/xing/hops/tree/master/packages/template-react) includes it by default).

The command `hops serve` is only available if `hops-express` is installed as a dependency in your project (also included in the default react template).

And the command `hops start` is only available if `hops-build` and `hops-express` are installed as dependencies. To disable rebuilds in production mode, you must simply disable cleaning: `hops start -p --clean=false`.

## Configuration

`hops` is being configured through [`hops-config`](https://github.com/xing/hops/tree/master/packages/config).
