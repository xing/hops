# Hops Template Redux

[![npm](https://img.shields.io/npm/v/hops-template-redux.svg)](https://www.npmjs.com/package/hops-template-redux)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a small example application showing [hops](../../DOCUMENTATION.md) in action. It demonstrates how to use hops with React, Redux and Jest.

It has the following folder structure:

```
├── node_modules
├── package.json
├── readme.md
└── src
    ├── app.js
    ├── counter
    │   ├── actions.js
    │   ├── constants.js
    │   ├── counterContainer.js
    │   ├── counter.js
    │   ├── index.js
    │   ├── reducer.js
    │   └── spec
    │       ├── actions.spec.js
    │       ├── counterContainer.spec.js
    │       ├── counter.spec.js
    │       ├── reducer.spec.js
    │       └── __snapshots__
    │           ├── counterContainer.spec.js.snap
    │           └── counter.spec.js.snap
    ├── home
    │   ├── home.js
    │   ├── index.js
    │   ├── spec
    │   │   ├── home.spec.js
    │   │   └── __snapshots__
    │   │       └── home.spec.js.snap
    │   └── styles.css
    └── reducers.js
```

This example uses `hops-react` to render in the browser or on the server via the same entry file `src/app.js`.

It contains a small example of the `react-router` with two routes: `/` (home) and `/counter`.

You can customize it to your needs - or use it as a reference guide when creating your own hops react project.

## Package.json scripts

### `npm start` / `yarn start`

This command can be used to start a development server with hot-code reloading or to start a production server.

- starting a development server: `npm start`
- starting a production server: `npm start --production`

Before you start a production server you need to build your JS bundle files.

### `npm run build` / `yarn build`

This command will generate the browser and server bundles that are required for deploying your code or running the production server through `npm start --production`.

It can also be used to statically build HTML pages for all `locations` that are configured in the `"config"` section of the `package.json`.

In this scenario it will iterate through the `locations` and render each location to a HTML document that will be placed in the `build/` folder.

To make use of this execute `npm run build -- --static`¹ or `yarn build --static`¹.

**¹:** the static HTML export has been [deprecated](https://github.com/untool/untool/blob/master/DEPRECATIONS.md#dep003).

### `npm test` / `yarn test`

This command will test your code with [jest](https://facebook.github.io/jest/) a testrunner by facebook that integrates nicely with react.

## Configuration

Please refer to the [main readme](../../DOCUMENTATION.md#presets) to see a list of all supported options.

In this project we configure `babel` and `postcss` through the `"browsers"` field and we specify two locations `/` and `/counter` through the `"locations"` hash.
