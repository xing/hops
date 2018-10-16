import fetch from 'cross-fetch';
import { print } from 'graphql';
import {
  mergeSchemas,
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  introspectSchema,
} from 'graphql-tools';

import github from './github/schema.graphql';
import exercise1Resolvers from './exercise1/resolvers';
import exercise2Resolvers from './exercise2/resolvers';
import exercise2Schema from './exercise2/schema.graphql';
import exercise3Resolvers from './exercise3/resolvers';
import exercise3Schema from './exercise3/schema.graphql';
import exercise4Resolvers from './exercise4/resolvers';
import exercise4Schema from './exercise4/schema.graphql';
import exercise5Resolvers from './exercise5/resolvers';
import exercise5Schema from './exercise5/schema.graphql';
import exercise6Resolvers from './exercise6/resolvers';
import exercise6Schema from './exercise6/schema.graphql';
import exercise7Resolvers from './exercise7/resolvers';
import exercise7Schema from './exercise7/schema.graphql';
import exercise8Resolvers from './exercise8/resolvers';
import exercise8Schema from './exercise8/schema.graphql';
import exercise9Resolvers from './exercise9/resolvers';
import exercise9Schema from './exercise9/schema.graphql';

const typeDefs = [
  github,
  exercise2Schema,
  exercise3Schema,
  exercise4Schema,
  exercise5Schema,
  exercise6Schema,
  exercise7Schema,
  exercise8Schema,
  exercise9Schema,
].map(schema => print(schema));

const resolvers = [
  exercise1Resolvers,
  exercise2Resolvers,
  exercise3Resolvers,
  exercise4Resolvers,
  exercise5Resolvers,
  exercise6Resolvers,
  exercise7Resolvers,
  exercise8Resolvers,
  exercise9Resolvers,
];

const localSchema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

const remoteSchemaOptions = {
  url: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
  },
};

const fetcher = async ({ query, variables, operationName, url, headers }) => {
  const fetchResult = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: print(query), variables, operationName }),
  });
  return fetchResult.json();
};

export default async function createSchema() {
  let remoteSchemaContent;
  try {
    remoteSchemaContent = await introspectSchema(options =>
      fetcher({ ...options, ...remoteSchemaOptions })
    );
  } catch (error) {
    console.log(
      'GraphQL Mock Server: Cannot introspect schema from',
      remoteSchemaOptions.url
    );
  }

  let remoteSchema;
  if (remoteSchemaContent) {
    remoteSchema = makeRemoteExecutableSchema({
      schema: remoteSchemaContent,
      fetcher: options => fetcher({ ...options, ...remoteSchemaOptions }),
    });
  }

  return mergeSchemas({
    schemas: [remoteSchema, localSchema].filter(Boolean),
    resolvers,
  });
}
