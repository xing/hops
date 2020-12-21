# `hops-react-apollo`

[![npm](https://img.shields.io/npm/v/hops-react-apollo.svg)](https://www.npmjs.com/package/hops-react-apollo)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that can be used to set up an `<ApolloProvider />` and enable client-side support for GraphQL via the Apollo framework.

### Installation

_This preset must be used together with the [`hops-react`](../react/README.md) preset._

Add this preset and its peer dependencies to your existing Hops React project:

```bash
npm install --save hops-react-apollo graphql-tag react react-apollo react-dom react-helmet-async react-router-dom
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### CLI

#### `graphql introspect`

Extract information to support the `IntrospectionFragmentMatcher` from either a remote GraphQL server or from a local GraphQL schema file.

This preset takes care of setting up the Apollo cache and fragment matchers - if a `fragmentsFile` is present it will use the `IntrospectionFragmentMatcher`, otherwise it will fall back to a `HeuristicFragmentMatcher`.

This is not strictly necessary but is recommended if you have a more complex schema and are querying fragments on unions or interfaces.

Head over to https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces to read more details about this.

##### Arguments

###### `-H` / `--header`

Pass additional HTTP headers that should be sent when executing the introspection query against a remote GraphQL server. For example when your server requires an authentication token or similar.

This argument can be specified multiple times to add multiple HTTP headers.

### Usage

#### Querying data on the client-side

In order to start using GraphQL in your application install this preset and configure the required options (see below).

Check out this [integration test](../spec/integration/graphql) as an example for how to use this preset.

#### GraphQL in a Typescript project

If you're importing queries from `.graphql`/`.gql`-files as modules, you have to make these module types known to the TS compiler. Therefore add them to [the `assets.d.ts`, that you should have in your project](../typescript#using-static-assets).

```ts
declare module '*.graphql';
declare module '*.gql';
```

### Configuration

#### Preset Options

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `fragmentsFile` | `String` | `<rootDir>/fragmentTypes.json` | _no_ | Where to store the generated fragment types file |
| `graphqlUri` | `String` | `''` | _yes_ | Url to your GraphQL endpoint or mock server |
| `graphqlSchemaFile` | `String` | `''` | _no_ | Path to your GraphQL schema file |
| `shouldPrefetchOnServer` | `Boolean` | `true` | _no_ | Whether Hops should execute GraphQL queries during server-side rendering **[deprecated]** |
| `allowServerSideDataFetching` | `Boolean` | `true` | _no_ | Whether Hops is allowed to execute GraphQL queries during server-side rendering |

##### `fragmentsFile`

This option controls where the fragment type information that are used for the `IntrospectionFragmentMatcher` should be saved.

By default executing `$ hops graphql introspect` will create a file called `fragmentTypes.json` in the application root directory.

```json
"hops": {
  "fragmentsFile": "<rootDir>/fragmentTypes.json"
}
```

##### `graphqlUri`

This is the full URI to your GraphQL endpoint which should be used by the client- and server-side when executing requests.

This will also be used to generate fragment type information with `$ hops graphql introspect` in case no [`graphqlSchemaFile`](#graphqlschemafile) has been provided.

```json
"hops": {
  "graphqlUri": "https://www.graphqlhub.com/graphql"
}
```

##### `graphqlSchemaFile`

In case your GraphQL server (configured via [`graphqlUri`](#graphqluri)) does not answer to introspection queries, you can provide the full schema as a file from which the introspection fragment matcher can generate information about unions and interfaces.

```json
"hops": {
  "graphqlSchemaFile": "<rootDir>/schema.graphql"
}
```

##### `shouldPrefetchOnServer` **[deprecated]**

Whether you want "full server-side rendering" or just "app shell" rendering.

This option controls whether you want Hops to execute GraphQL queries during server-side rendering, so that the actual components with actual data will get rendered (if set to false, Hops will not fetch data during server-side rendering).

```json
"hops": {
  "shouldPrefetchOnServer": false
}
```

##### `allowServerSideDataFetching`

If you don't want Hops to do full server-side rendering, set this value to `false`.

Bear in mind, that setting this value to `true` on the other hand has no mandatory character. This means that there's no way to force Hops to execute server-side requests. As soon as there's a single Hops preset in place, that either sets the `allowServerSideDataFetching`-value to `false` or implements the [`canPrefetchOnServer`](#canprefetchonserver-boolean-sequence-server)-hook to return `false`, there won't be any server-side requests.

#### Render Options

This preset has only a single runtime option which can be passed to the `render()` options inside the `styled` key (see example above).

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `graphql.link` | `ApolloLink` | `ApolloHttpLink` | _no_ | An instance of a `apollo-link` |
| `graphql.cache` | `ApolloCache` | `ApolloCacheInMemory` | _no_ | An instance of a `apollo-cache` |

##### `link`

By default this preset creates an `HttpLink` with the configured [`graphqlUri`](#graphqluri). If you need a different link, you can pass the instantiated link to the render options.

Read more about Apollo links here:

- https://www.apollographql.com/docs/link/
- https://www.apollographql.com/docs/react/networking/network-layer/

```javascript
export default render(<MyApp />, {
  graphql: { link: new HttpLink({ uri: 'http://api.githunt.com/graphql' }) },
});
```

##### `cache`

By default this preset creates an [`InMemoryCache`](https://www.apollographql.com/docs/react/caching/cache-configuration/) which uses either the [`IntrospectionFragmentMatcher` or `HeuristicFragmentMatcher`](https://www.apollographql.com/docs/react/data/fragments/) depending on whether fragment introspection results are available or not (create them with [`$ hops graphql introspect`](#graphql-introspect)).

In case you need to configure a different Apollo cache you can pass an instantiated cache to the render options.

Read more about Apollo caches here: https://www.apollographql.com/docs/react/caching/cache-configuration/

```javascript
export default render(<MyApp />, {
  graphql: {
    cache: new InMemoryCache(),
  },
});
```

### Mixin Hooks API

**Caution**: Please be aware that the mixin hooks are not part of the SemVer API contract. This means that hook methods and signatures can change even in minor releases. Therefore it's up to you to make sure that all hooks that you are using in your own mixins still adhere to the new implementation after an upgrade of a Hops packages.

#### `getApolloLink(): ApolloLink` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Hook to return a custom [ApolloLink](https://github.com/apollographql/apollo-link).

Useful when the link needs access to the current request object, which only exists in the mixin context.

Beware that `link` passed as render option takes precedence.

#### `getApolloCache(): ApolloCache` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Hook to return a custom [ApolloCache](https://www.apollographql.com/docs/react/advanced/caching.html).

### `createFragmentMatcher` ([override](https://github.com/untool/mixinable/blob/master/README.md#defineoverride)) **runtime/browser/server**

Allows to get the [fragment matcher](https://www.apollographql.com/docs/react/advanced/fragments.html) that needs to be passed to the `ApolloCache`. Useful if you plan to override `getApolloCache`.

#### `canPrefetchOnServer(): boolean` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel)) **server**

This is a hook that can be used to customize the behavior of when Hops can prefetch data during server-side rendering. E.g. execute GraphQL queries during initial render. If any function of this sequence returns false it prevents server fetching for this request.

By default it returns whatever is configured in the [`allowServerSideDataFetching` preset option](#allowServerSideDataFetching).

In case you need more control over the server-side rendering you can implement this method and provide your own implementation that decides if data should be prefetched during server-side rendering.
