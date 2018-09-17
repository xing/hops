# GraphQL Mock Server

> Faster React component development using GraphQL Mock-Server (Apollo)

When you are using GraphQL on client side to fetch and bind data into your UI components, it's quite often necessary to work with mock/stub data. There exists tons of feasible reasons why mocking makes sense in daily practices. In summary, the following seem to be the most important.

- GraphQL schema design in a Frontend-Driven approach
- Switching between local and remote query execution to work autonomously without an online GraphQL-Server access
- Faster execution of component integration test using local mock data sets
- Mock data set support to prove experimental/feature functionality thesis

You can configure one or more GraphQL server URLs to merge them together to a larger schema (also known as [schema stitching](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html)).

## Setup

**Install hops-graphql preset**

`yarn add hops-graphql`

**Start Hops development**

`hops start`

**Supports Local GraphQL Playground against your GraphQL schema**

`open http://localhost:<port>/graphql`

![GraphiQL Playground](./playground.png)

## Mock-Server Configuration

### Example

**`package.json`**

```json
{
  "hops": {
    "graphqlMocks": "<rootDir>/graphql/index.js"
  }
}
```

**`graphql/index.js`**

```javascript
import mockSchema1 from './mocks/feature1.graphql';
import mockSchema2 from './mocks/feature2.graphql';
import mockResolvers1 from './mocks/feature1';
import mockResolvers2 from './mocks/feature2';

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
  mockSchema2,
];

export const resolvers = [mockResolvers1, mockResolvers2];

export const mocks = {
  Date: () => new Date().toISOString(),
};
```

## GraphQL Mock-Server usage examples

- [Custom field resolver](../../spec/integration/graphql-mock-server/mocks/exercise1)
- [Extend Query Type](../../spec/integration/graphql-mock-server/mocks/exercise2)
- [Usage of interface](../../spec/integration/graphql-mock-server/mocks/exercise3)
- [Mock scalar values](../../spec/integration/graphql-mock-server/mocks/exercise4)
- [Mock interface types](../../spec/integration/graphql-mock-server/mocks/exercise5)
- [Mock union types](../../spec/integration/graphql-mock-server/mocks/exercise6)
- [Mock enums](../../spec/integration/graphql-mock-server/mocks/exercise7)
- [Mock mutations with success and error fields](../../spec/integration/graphql-mock-server/mocks/exercise8)
- [Cursor-based pagination with connection and edges](../../spec/integration/graphql-mock-server/mocks/exercise9)
