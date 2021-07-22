# Hops Template GraphQL

[![npm](https://img.shields.io/npm/v/hops-template-graphql.svg)](https://www.npmjs.com/package/hops-template-graphql)

**Please see the [main Hops Readme](https://github.com/xing/hops#docs) for general information and a Getting Started Guide.**

This is a small example application showing [hops](https://github.com/xing/hops#docs) in action. It demonstrates how to use hops with React, GraphQL and Jest.

It has the following folder structure:

```
├── node_modules
├── package.json
├── README.md
└── src
    ├── app.js
    └── home
        ├── commits.gql
        ├── home.js
        ├── index.js
        ├── spec
        │   ├── home.spec.js
        │   └── __snapshots__
        │       └── home.spec.js.snap
        └── styles.css
```

This example uses `hops-react` to render in the browser or on the server via the same entry file `src/app.js`.

It contains a small example of how to use `hops-graphql` to fetch data from a GraphQL endpoint.

You can customize it to your needs - or use it as a reference guide when creating your own hops react project.

## Package.json scripts

### `npm start` / `yarn start`

This command can be used to start a development server with hot-code reloading or to start a production server.

- starting a development server: `npm start`
- starting a production server: `npm start --production`

Before you start a production server you need to build your JS bundle files.

### `npm run build` / `yarn build`

This command will generate the browser and server bundles that are required for deploying your code or running the production server through `npm start --production`.

### `npm test` / `yarn test`

This command will test your code with [jest](https://facebook.github.io/jest/) a testrunner by facebook that integrates nicely with react.

## Configuration

Please refer to the [main readme](../../DOCUMENTATION.md#presets) to see a list of all supported options.

In this project we configure `babel` and `postcss` through the `"browsers"` field and we specify the URL of the GraphQL server through the `"graphqlUri"` field.
