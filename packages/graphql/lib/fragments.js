/* global fetch */
'use strict';

require('isomorphic-fetch');
const { access, readFile, writeFile } = require('fs');
const { promisify } = require('util');
const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

function writeFragmentTypesFile(fragmentsFile, result) {
  result.data.__schema.types = result.data.__schema.types.filter(
    t => t.possibleTypes !== null
  );
  return promisify(writeFile)(fragmentsFile, JSON.stringify(result.data));
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
  }).then(result => result.json());
}

function executeLocalQuery(schemaFile, query) {
  return promisify(readFile)(schemaFile, 'utf-8')
    .then(typeDefs => makeExecutableSchema({ typeDefs }))
    .then(executableSchema => graphql(executableSchema, query));
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
    .then(result => writeFragmentTypesFile(options.fragmentsFile, result));
};
