'use strict';

const fetch = require('cross-fetch');
const { access, readFile, writeFile } = require('fs');
const { promisify } = require('util');
const { graphql } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const deprecate = require('depd')('hops-react-apollo');

function writeFragmentTypesFile(apolloVersion, fragmentsFile, result) {
  if (apolloVersion === 2) {
    // TODO: remove with Hops v15
    deprecate(
      '[DEP0006] Apollo v2 support in Hops has been deprecated and will be removed with Hops v15. Please upgrade to Apollo v3 (https://github.com/xing/hops/blob/master/DEPRECATIONS.md#dep006).'
    );

    result.data.__schema.types = result.data.__schema.types.filter(
      (t) => t.possibleTypes !== null
    );
    return promisify(writeFile)(fragmentsFile, JSON.stringify(result.data));
  }

  const possibleTypes = {};
  result.data.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(
        (subtype) => subtype.name
      );
    }
  });
  return promisify(writeFile)(fragmentsFile, JSON.stringify(possibleTypes));
}

function executeRemoteQuery(graphqlUri, optionalHeaders = [], query) {
  const headers = optionalHeaders.reduce(
    (headers, header) => {
      const parts = header.split(':');
      headers[parts.shift()] = parts.join(':');
      return headers;
    },
    {
      'Content-Type': 'application/json',
    }
  );
  return fetch(graphqlUri, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  }).then((result) => result.json());
}

function executeLocalQuery(schemaFile, query) {
  return promisify(readFile)(schemaFile, 'utf-8')
    .then((typeDefs) =>
      makeExecutableSchema({
        typeDefs,
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
      })
    )
    .then((executableSchema) => graphql(executableSchema, query));
}

const query = `
query IntrospectionQuery {
  __schema {
    types {
      kind
      name
      possibleTypes {
        name
      }
    }
  }
}
`;

module.exports = function generateFragmentTypes(options) {
  return promisify(access)(options.schemaFile)
    .then(
      () => executeLocalQuery(options.schemaFile, query),
      () => executeRemoteQuery(options.graphqlUri, options.headers, query)
    )
    .then((result) =>
      writeFragmentTypesFile(
        options.apolloVersion,
        options.fragmentsFile,
        result
      )
    );
};
