const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const express = require('express');
const { print } = require('graphql');
const {
  addMockFunctionsToSchema,
  introspectSchema,
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} = require('graphql-tools');
const fetch = require('isomorphic-fetch');

/* eslint-disable node/no-missing-require */
const {
  schemas = [],
  resolvers = [],
  mocks = {},
} = require('hops-graphql-mocks');
/* eslint-enable node/no-missing-require */

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

module.exports = async hopsConfig => {
  const localSchema = makeExecutableSchema({
    typeDefs: schemas
      .filter(s => typeof s.kind !== 'undefined')
      .map(s => print(s)),
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  const remoteSchemas = await schemas.reduce(async (previousPromise, value) => {
    const remoteSchemas = await previousPromise;
    if (typeof value !== 'string' && typeof value.url !== 'string') {
      return remoteSchemas;
    }
    const fetcherOptions = typeof value === 'string' ? { url: value } : value;

    let remoteSchemaContent;
    try {
      remoteSchemaContent = await introspectSchema(options =>
        fetcher({ ...options, ...fetcherOptions })
      );
    } catch (_) {
      console.warn(`Skip: Can't introspect schema from ${fetcherOptions.url}`);
      return remoteSchemas;
    }

    return [
      ...remoteSchemas,
      makeRemoteExecutableSchema({
        schema: remoteSchemaContent,
        fetcher: options => fetcher({ ...options, ...fetcherOptions }),
      }),
    ];
  }, Promise.resolve([]));

  const schema = mergeSchemas({
    schemas: [...remoteSchemas, localSchema],
    resolvers,
  });

  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true,
  });

  const app = express();
  app.use(cookieParser());
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, config: hopsConfig }),
  });
  server.applyMiddleware({ app });

  return (req, res, next) => {
    app.handle(req, res, next);
  };
};
