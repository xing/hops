# `hops-graphql`

[![npm](https://img.shields.io/npm/v/hops-graphql.svg)](https://www.npmjs.com/package/hops-graphql)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that can be used to set up an `<ApolloProvider />` and enable server-side and client-side support for GraphQL via the Apollo framework. Additionally it also brings an Apollo Server that can be used for mocking to enable faster local development.

This preset is just combining the two presets [`hops-react-apollo`](../react-apollo/README.md#presets) and [`hops-apollo-mock-server`](../apollo-mock-server/README.md#presets).

### Installation

_This preset must be used together with the [`hops-react`](../react/README.md#presets) preset._

Add this preset and its peer dependencies to your existing Hops React project:

```bash
npm install --save hops-graphql @apollo/client
```
