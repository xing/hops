# `hops-graphql`

[![npm](https://img.shields.io/npm/v/hops-graphql/next.svg)](https://www.npmjs.com/package/hops-graphql)

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that can be used to set up an `<ApolloProvider />` and enable server-side and client-side support for GraphQL via the Apollo framework.

### Installation

_This preset must be used together with the `hops-react` preset._

Add this preset and its peer dependencies `graphql-tag` and `react-apollo` to your existing Hops React project:

```bash
$ yarn add hops-graphql@next graphql-tag react-apollo
# OR npm install --save hops-graphql@next graphql-tag react-apollo
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

### CLI

#### `graphql introspect`

Extract information to support the `IntrospectionFragmentMatcher` from either a remote GraphQL server or from a local GraphQL schema file.

This preset takes care of setting up the Apollo cache and fragment matchers - if a `fragmentsFile` is present it will use the `IntrospectionFragmentMatcher`, otherwise it will fall back to a `HeuristicFragmentMatcher`.

This is not strictly necessary but is recommended if you have a more complex schema and are querying fragments on unions or interfaces.

Head over to https://github.com/apollographql/react-docs/blob/master/source/initialization.md#using-fragments-on-unions-and-interfaces to read more details about this.

##### Arguments

###### `-H` / `--header`

Pass additional HTTP headers that should be sent when executing the introspection query against a remote GraphQL server. For example when your server requires an authentication token or similar.

This argument can be specified multiple times to add multiple HTTP headers.

### Usage

#### Querying data on the client-side

In order to start using GraphQL in your application install this preset and configure the required options (see below).

Check out this [integration test](https://github.com/xing/hops/tree/master/packages/spec/integration/graphql) as an example for how to use this preset.

#### Creating custom mocks and stitching schemas using Apollo Server

When you are using GraphQL on client side to fetch and bind data into your UI components, it's quite often necessary to work with mock/stub data. There exists tons of feasible reasons why mocking makes sense in daily practices. In summary, the following seem to be the most important.

- GraphQL schema design in a Frontend-Driven approach
- Switching between local and remote query execution to work autonomously without an online GraphQL-Server access
- Faster execution of component integration test using local mock data sets
- Mock data set support to prove experimental/feature functionality thesis

You can configure one or more GraphQL server URLs to merge them together to a larger schema (also known as [schema stitching](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html)).

**Supports Local GraphQL Playground against your GraphQL schema**

`open http://localhost:<port>/graphql`

![GraphiQL Playground](./playground.png)

## GraphQL Mock-Server usage examples

- [Custom field resolver](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise1)
- [Extend Query Type](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise2)
- [Usage of interface](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise3)
- [Mock scalar values](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise4)
- [Mock interface types](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise5)
- [Mock union types](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise6)
- [Mock enums](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise7)
- [Mock mutations with success and error fields](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise8)
- [Cursor-based pagination with connection and edges](https://github.com/xing/hops/tree/refactor-graphql-mock-server/packages/spec/integration/graphql-mock-server/mocks/exercise9)

### Configuration

#### Preset Options

| Name                      | Type      | Default                                 | Required | Description                                                              |
| ------------------------- | --------- | --------------------------------------- | -------- | ------------------------------------------------------------------------ |
| `fragmentsFile`           | `String`  | `<rootDir>/fragmentTypes.json`          | _no_     | Where to store the generated fragment types file                         |
| `graphqlSchemaFile`       | `String`  | `''`                                    | _no_     | Path to your GraphQL schema file                                         |
| `graphqlUri`              | `String`  | `''`                                    | _yes_    | Url to your GraphQL endpoint                                             |
| `shouldPrefetchOnServer`  | `Boolean` | `true`                                  | _no_     | Whether Hops should execute GraphQL queries during server-side rendering |
| `enableGraphqlMockServer` | `Boolean` | `process.env.NODE_ENV !== 'production'` | _no_     | Whether Hops should start an Apollo GraphQL Mock Server                  |
| `graphqlMocks`            | `String`  | `''`                                    | _no_     | Path to your GraphQL Schema mocks                                        |

##### `fragmentsFile`

This option controls where the fragment type information that are used for the `IntrospectionFragmentMatcher` should be saved.

By default executing `$ hops graphql introspect` will create a file called `fragmentTypes.json` in the application root directory.

```json
"hops": {
  "fragmentsFile": "<rootDir>/fragmentTypes.json"
}
```

##### `graphqlSchemaFile`

In case your GraphQL server (configured via [`graphqlUri`](#graphqluri)) does not answer to introspection queries, you can provide the full schema as a file from which the introspection fragment matcher can generate information about unions and interfaces.

```json
"hops": {
  "graphqlSchemaFile": "<rootDir>/schema.graphql"
}
```

##### `graphqlUri`

This is the full uri to your GraphQL endpoint which should be used by the client- and server-side when executing requests.

This will also be used to generate fragment type information with `$ hops graphql introspect` in case no [`graphqlSchemaFile`](#graphqlschemafile) has been provided.

```json
"hops": {
  "graphqlUri": "https://www.graphqlhub.com/graphql"
}
```

##### `shouldPrefetchOnServer`

Whether you want "full server-side rendering" or just "app shell" rendering.

This option controls whether you want Hops to execute GraphQL queries during server-side rendering, so that the actual components with actual data will get rendered (if set to false, Hops will not fetch data during server-side rendering).

```json
"hops": {
  "shouldPrefetchOnServer": false
}
```

##### `enableGraphqlMockServer`

This option controls whether the Apollo GraphQL Mock Server should be started.

By default it will check the `NODE_ENV` environment variable and start if `NODE_ENV !== production`.

```json
"hops": {
  "enableGraphqlMockServer": false
}
```

##### `graphqlMocks`

Specify the path to your GraphQL mocks, containing local and remote schemas, resolvers and mocks which will be used in the Apollo GraphQL Mock Server.

This file needs to export one or more of the following values:

- schemas (an array of local or remote schemas)
- resolvers (an array of your resolver functions)
- mocks (an object whose keys represent data types and the values are functions that return mock values)

```json
{
  "hops": {
    "graphqlMocks": "<rootDir>/graphql/index.js"
  }
}
```

**Example mock config file: `graphql/index.js`**

```javascript
import mockSchema1 from './mocks/feature1.graphql';
import mockResolvers1 from './mocks/feature1';

// schemas can contain remote or local schemas
// the order of the schemas is important because one schema may depend on types defined in another schema
export const schemas = [
  {
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
    },
  },
  mockSchema1,
];

export const resolvers = [mockResolvers1];

export const mocks = {
  Date: () => new Date().toISOString(),
};
```

#### Render Options

This preset has only a single runtime option which can be passed to the `render()` options inside the `styled` key (see example above).

| Name            | Type          | Default               | Required | Description                     |
| --------------- | ------------- | --------------------- | -------- | ------------------------------- |
| `graphql.link`  | `ApolloLink`  | `ApolloHttpLink`      | _no_     | An instance of a `apollo-link`  |
| `graphql.cache` | `ApolloCache` | `ApolloCacheInMemory` | _no_     | An instance of a `apollo-cache` |

##### `link`

By default this preset creates an `HttpLink` with the configured [`graphqlUri`](#graphqluri). If you need a different link, you can pass the instantiated link to the render options.

Read more about Apollo links here:

- https://www.apollographql.com/docs/link/
- https://www.apollographql.com/docs/react/advanced/network-layer.html

```javascript
export default render(<MyApp />, {
  graphql: { link: new HttpLink({ uri: 'http://api.githunt.com/graphql' }) },
});
```

##### `cache`

By default this preset creates an [`InMemoryCache`](https://www.apollographql.com/docs/react/advanced/caching.html) which uses either the [`IntrospectionFragmentMatcher` or `HeuristicFragmentMatcher`](https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher) depending on whether fragment introspection results are available or not (create them with [`$ hops graphql introspect`](#graphql-introspect)).

In case you need to configure a different Apollo cache you can pass an instantiated cache to the render options.

Read more about Apollo caches here: https://www.apollographql.com/docs/react/advanced/caching.html#configuration

```javascript
export default render(<MyApp />, {
  graphql: {
    cache: new InMemoryCache(),
  },
});
```

### Mixin Hooks API

#### `getApolloLink(): ApolloLink` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Hook to return a custom [ApolloLink](https://github.com/apollographql/apollo-link).

Useful when the link needs access to the current request object, which only exists in the mixin context.

Beware that `link` passed as render option takes precedence.

#### `getApolloCache(): ApolloCache` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Hook to return a custom [ApolloCache](https://www.apollographql.com/docs/react/advanced/caching.html).

### `createFragmentMatcher` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Allows to get the [fragment matcher](https://www.apollographql.com/docs/react/advanced/fragments.html) that needs to be passed to the `ApolloCache`. Useful if you plan to override `getApolloCache`.

#### `shouldPrefetchOnServer(): boolean` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **server**

This is an overrideable hook that can be used to customize the behavior of when Hops should prefetch data during server-side rendering. E.g. execute GraphQL queries during initial render.

By default it returns whatever is configured in the [`shouldPrefetchOnServer` preset option](#shouldprefetchonserver) or `true` if the config is not set.

In case you need more control over the server-side rendering you can implement this method and provide your own implementation that decides if data should be prefetched during server-side rendering.
