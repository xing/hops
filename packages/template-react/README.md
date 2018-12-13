# Hops Template React

[![npm](https://img.shields.io/npm/v/hops-template-react.svg)](https://www.npmjs.com/package/hops-template-react)

**Please see the [main Hops Readme](https://github.com/xing/hops/blob/master/README.md) for general information and a Getting Started Guide.**

This is a small example application showing [hops](https://github.com/xing/hops) in action. It demonstrates how to use hops with React.

It has the following folder structure:

```
├── node_modules
├── package.json
├── readme.md
└── src
    ├── app.js
    ├── counter
    │   ├── index.js
    │   └── spec
    │       ├── index.spec.js
    │       └── __snapshots__
    │           └── index.spec.js.snap
    └── home
        ├── index.js
        ├── spec
        │   ├── index.spec.js
        │   └── __snapshots__
        │       └── index.spec.js.snap
        └── styles.css
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

It can also be used to statically build HTML pages for all `locations` that are configured in the config section of the `package.json`.

In this scenario it will iterate through the `locations` and render each location to a HTML document that will be placed in the `dist/` folder.

To make use of this execute `npm run build -- --static` or `yarn build --static`.

### `npm test` / `yarn test`

This command will test your code with [jest](https://facebook.github.io/jest/) a testrunner by facebook that integrates nicely with react.

### `npm serve` / `yarn serve`

To serve your application using a production-ready Express.js server, execute this command after [building your application](#npm-run-build--yarn-build)

## Configuration

Please refer to the [main readme](https://github.com/xing/hops#installing--configuring-a-preset) for an example of how to configure your presets and check out the individual preset readme files for the presets used in this project for more in-depth explanations:

- [hops-preset-defaults](https://github.com/xing/hops/tree/master/packages/preset-defaults)
- [hops-react](https://github.com/xing/hops/tree/master/packages/react)
- [hops-postcss](https://github.com/xing/hops/tree/master/packages/postcss)

In this project we configure `babel` and `postcss` through the `"browsers"` field and we specify two loctions `/` and `/counter` through the `"locations"` hash.
