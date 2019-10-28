# `hops-graphql`

[![npm](https://img.shields.io/npm/v/hops-graphql.svg)](https://www.npmjs.com/package/hops-graphql)

**Please see the [main Hops Readme](https://github.com/xing/hops/blob/master/README.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that can be used to set up an `<ApolloProvider />` and enable server-side and client-side support for GraphQL via the Apollo framework. Additionally it also brings an Apollo Server that can be used for mocking to enable faster local development.

This preset is just combining the two presets [`hops-react-apollo`](https://github.com/xing/hops/blob/master/packages/apollo/README.md#presets) and [`hops-apollo-mock-server`](https://github.com/xing/hops/blob/master/packages/apollo-mock-server/README.md#presets).

### Installation

_This preset must be used together with the [`hops-react`](https://github.com/xing/hops/blob/master/packages/react/README.md#presets) preset._

Add this preset and its peer dependencies to your existing Hops React project:

```bash
npm install --save hops-graphql graphql-tag react react-apollo react-dom react-helmet-async react-router-dom
```
