# `hops-graphql`

[![npm](https://img.shields.io/npm/v/hops-graphql.svg)](https://www.npmjs.com/package/hops-graphql)

[//]: # 'TODO: add general section about presets, how to install them, how to register them, how to configure them to main Hops readme'

This is a [preset for Hops](https://missing-link-explain-what-are-presets) that can be used to set up an `<ApolloProvider />` and enable server-side and client-side support for GraphQL via the Apollo framework.

### Installation

_This preset must be used together with the `hops-react` preset._

Just add this preset and its peer dependencies `graphql-tag` and `react-apollo` to your existing Hops React project:

```bash
$ yarn add hops-graphql graphql-tag react-apollo
# OR npm install --save hops-graphql graphql-tag react-apollo
```

[//]: # 'TODO: add general section about setting up a basic hops project to main Hops readme'

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://missing-link-explain-quick-start)

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

This preset has no exports and therefore just needs to be installed in order to start using `apollo-graphql` in your app.

Check out this [integration test](https://github.com/xing/hops/tree/next/packages/spec/integration/graphql) as an example for how to use this preset.

### Configuration

#### Preset Options

| Name                | Type     | Default                        | Required | Description                                      |
| ------------------- | -------- | ------------------------------ | -------- | ------------------------------------------------ |
| `fragmentsFile`     | `String` | `<rootDir>/fragmentTypes.json` | _no_     | Where to store the generated fragment types file |
| `graphqlSchemaFile` | `String` | `''`                           | _no_     | Path to your GraphQL schema file                 |
| `graphqlUri`        | `String` | `''`                           | _yes_    | Url to your GraphQL endpoint                     |

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
