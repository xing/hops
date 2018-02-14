# Hops GraphQL

[![npm](https://img.shields.io/npm/v/hops-graphql.svg)](https://www.npmjs.com/package/hops-graphql)

hops-graphql extends [hops-react](https://github.com/xing/hops/tree/master/packages/react) by providing a rendering context injecting a [GraphQL](http://graphql.org) [`Provider`](https://github.com/apollographql/react-apollo) and some helpers.

Additionally, hops-graphql features a CLI tool to help working with GraphQL schemas.

# Installation

To use hops-graphql, you need to add it and its dependencies to an existing project that already has [hops-react](https://github.com/xing/hops/tree/master/packages/react) installed.

```bash
npm install --save hops-graphql react react-apollo graphql-tag
```

# Usage

Generally, you will use hops-react exactly as you would use a well configured [Apollo Client](http://dev.apollodata.com/react/). hops-graphql only adds a bit of convenience and works out-of-the-box with the other Hops components.

## Configuration

Add your GraphQL endpoint to your Hops config - usually, this means adding a line with your GraphQL endpoint's full URL to your project's `package.json` file:

```json
{
  "config": {
    "graphqlUri": "https://www.graphqlhub.com/graphql"
  }
}
```

For more elaborate (e.g. environment specific configs), please refer to the [hops-config docs](https://github.com/xing/hops/tree/master/packages/config).

## CLI

To allow you to work with fragments on interfaces or unions with GraphQL, you need to provide additional information derived from your actual schema to the client. To fetch and supply that info, please run the command provided by this package in your project's root folder:

```bash
hops graphql introspect
```

The generated file, `fragmentTypes.json` will be picked up automatically by hops-graphql. Please make sure to commit it to version control.

# API

## `graphqlExtension(config)`

`graphqlExtension()` is hops-graphql's main export. It is used as an extension to [`hops-react's render function`](https://github.com/xing/hops/tree/master/packages/react#renderreactelement-config). Its [config options](https://www.apollographql.com/docs/react/reference/index.html#ApolloClientOptions) are directly passed passed in to the [`ApolloClient` constructor](https://www.apollographql.com/docs/react/reference/index.html#ApolloClient)

Defaults for the `graphql` config are very similar to those in the [default implementation](https://www.npmjs.com/package/apollo-client-preset) with the exception that `hopsConfig.graphqlUri` is being used as HTTP endpoint.

## `createContext(options)`

`createContext()` is hops-graphql's main export. Additional to the config options of [hops-react's createContext](https://github.com/xing/hops/tree/master/packages/react#createcontextoptions) it takes additional options as described [above under `graphqlExtension(config)`](#graphqlextensionconfig). Be careful, in this case you have to wrap the config options under the `graphql` namespace.

## `GraphQLContext`

This constructor function is an advanced API feature, meant to help you build your own context factory functions. For more info, please read up on hops-react [render contexts](https://github.com/xing/hops/tree/master/packages/react#render-contexts).

# Example

### `hero.gql`

```graphql
{
  hero {
    name
    height
  }
}
```

### `hero.js`

```js
import React from 'react';
import { graphql } from 'react-apollo';

import query from './hero.gql';

export const withHero = graphql(query);

export const Home = ({ data: { loading, hero } }) =>
  loading ? (
    <p>Loading...</p>
  ) : (
    <p>
      {hero.name}: {hero.height}
    </p>
  );

export default withHero(Home);
```
