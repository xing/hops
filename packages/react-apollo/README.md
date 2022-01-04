# `hops-react-apollo`

[![npm](https://img.shields.io/npm/v/hops-react-apollo.svg)](https://www.npmjs.com/package/hops-react-apollo)

**Please see the [main Hops Readme](https://github.com/xing/hops#docs) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that can be used to set up an `<ApolloProvider />` and enable client-side support for GraphQL via the Apollo framework.

### Installation

_This preset must be used together with the [`hops-react`](../react/README.md) preset._

Add this preset and its peer dependencies to your existing Hops React project:

```bash
npm install --save hops-react-apollo react @apollo/client react-dom react-helmet-async react-router-dom
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### CLI

#### `graphql introspect`

This command extracts the polymorphic relationships between interfaces and types that implement it and writes it to the location of `fragmentsFile`.

This is recommended if you have a more complex schema and are querying fragments on unions or interfaces.

Head over to https://www.apollographql.com/docs/react/data/fragments/ to read more details about this.

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
| `allowServerSideDataFetching` | `Boolean` | `true` | _no_ | Whether Hops is allowed to execute GraphQL queries during server-side rendering |

##### `fragmentsFile`

This option controls where the fragment type information that are used for the `possibleTypes` option should be saved.

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

##### `allowServerSideDataFetching`

If you don't want Hops to do full server-side rendering, set this value to `false`.

Bear in mind, that setting this value to `true` on the other hand has no mandatory character. This means that there's no way to force Hops to execute server-side requests. As soon as there's a single Hops preset in place, that either sets the `allowServerSideDataFetching`-value to `false` or implements the [`canPrefetchOnServer`](#canprefetchonserver-boolean-sequence-server)-hook to return `false`, there won't be any server-side requests.

#### Render Options

This preset has options for controlling the apollo cache and link via the `graphql` key inside the options object of the `render(element, options?)` function.

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `graphql.link` | `ApolloLink` | `ApolloHttpLink` | _no_ | An instance of an apollo link (e.g. [`HttpLink`](https://www.apollographql.com/docs/react/api/link/apollo-link-http/)) |
| `graphql.cache` | `ApolloCache` | `ApolloCacheInMemory` | _no_ | An instance of an apollo cache (e.g. [`InMemoryCache`](https://www.apollographql.com/docs/react/api/cache/InMemoryCache/)) |

##### `link`

By default this preset creates an `HttpLink` with the configured [`graphqlUri`](#graphqluri). If you need a different link, you can pass the instantiated link to the render options.

Read more about Apollo links here:

- https://www.apollographql.com/docs/link/
- https://www.apollographql.com/docs/react/networking/basic-http-networking/

```javascript
export default render(<MyApp />, {
  graphql: { link: new HttpLink({ uri: 'http://api.githunt.com/graphql' }) },
});
```

##### `cache`

By default this preset creates an [`InMemoryCache`](https://www.apollographql.com/docs/react/caching/cache-configuration/) and passes the fragment types as `possibleTypes` (create them with [`$ hops graphql introspect`](#graphql-introspect)). It also takes care of cache rehydration to pass cached data from a server-side request to the client-side.

In case you need to configure a different Apollo cache you can pass an instantiated cache to the render options.

Read more about Apollo caches here: https://www.apollographql.com/docs/react/caching/cache-configuration/

```javascript
import possibleTypes from 'hops-react-apollo-preset/fragmentTypes.json';

export default render(<MyApp />, {
  graphql: {
    cache: new InMemoryCache({
      possibleTypes,
    }),
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

#### `canPrefetchOnServer(): boolean` ([sequence](https://github.com/untool/mixinable/blob/master/README.md#defineparallel)) **server**

This is a hook that can be used to customize the behavior of when Hops can prefetch data during server-side rendering. E.g. execute GraphQL queries during initial render. If any function of this sequence returns false it prevents server fetching for this request.

By default it returns whatever is configured in the [`allowServerSideDataFetching` preset option](#allowServerSideDataFetching).

In case you need more control over the server-side rendering you can implement this method and provide your own implementation that decides if data should be prefetched during server-side rendering.
