# `hops-apollo-mock-server`

[![npm](https://img.shields.io/npm/v/hops-apollo-mock-server.svg)](https://www.npmjs.com/package/hops-apollo-mock-server)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) in order to start and configure an Apollo Server that can be used for GraphQL mocking to enable faster local development.

### Installation

Add this preset (and any other packages that you may need to create an executable schema, such as `@graphql-tools/schema`) to your existing Hops React project:

```bash
npm install --save hops-apollo-mock-server
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### Usage

#### Creating custom mocks and stitching schemas using Apollo Server

When you are using GraphQL on client side to fetch and bind data into your UI components, it's quite often necessary to work with mock/stub data. There exists tons of feasible reasons why mocking makes sense in daily practices. In summary, the following seem to be the most important.

- GraphQL schema design in a Frontend-Driven approach
- Switching between local and remote query execution to work autonomously without an online GraphQL-Server access
- Faster execution of component integration test using local mock data sets
- Mock data set support to prove experimental/feature functionality thesis

You can enable mocking by configuring a file that exports an executable schema. Read more about [schema stitching](https://www.graphql-tools.com/docs/schema-stitching) and check out [this blog post](https://blog.hasura.io/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072) for more examples.

**Supports Local GraphQL Playground against your GraphQL schema**

`open http://localhost:<port>/graphql`

![GraphiQL Playground](./playground.png)

### Configuration

#### Preset Options

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `fragmentsFile` | `String` | `<rootDir>/fragmentTypes.json` | _no_ | Where to store the generated fragment types file |
| `graphqlUri` | `String` | `''` | _yes_ | Url to your GraphQL endpoint or mock server |
| `graphqlSchemaFile` | `String` | `''` | _no_ | Path to your GraphQL schema file |
| `graphqlMockSchemaFile` | `String` | `''` | _no_ | Path to your GraphQL schema mocks |
| `graphqlMockServerPath` | `String` | `'/graphql'` | _no_ | Path of the mock server endpoint |

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

##### `graphqlMockSchemaFile`

Specify the path to your stitched mock schema, which is a file that exports an executable schema or a promise that resolves to an executable schema.

```json
{
  "hops": {
    "graphqlMockSchemaFile": "<rootDir>/graphql/index.js"
  }
}
```

**Example mock schema: `graphql/index.js`**

```javascript
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import merge from 'lodash.merge';

import schema1 from './schema1.graphql';
import schema2 from './schema2.graphql';

import resolvers1 from './resolvers1';
import resolvers2 from './resolvers2';

const typeDefs = [schema1, schema2];

const resolvers = merge(resolvers1, resolvers2);

const mockSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default addMocksToSchema({
  schema: mockSchema,
  mocks: {
    Date: () => '2017-10-17T13:06:22Z',
  },
  preserveResolvers: true,
});
```
