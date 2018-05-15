/* global fetch */
'use strict';

require('isomorphic-fetch');
const { access, readFile, writeFile } = require('fs');
const pify = require('pify');
const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

function writeFragmentTypesFile(fragmentsFile, result) {
  result.data.__schema.types = result.data.__schema.types.filter(
    t => t.possibleTypes !== null
  );
  return pify(writeFile)(fragmentsFile, JSON.stringify(result.data));
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
  return pify(readFile)(schemaFile, 'utf-8')
    .then(typeDefs => makeExecutableSchema({ typeDefs }))
    .then(executableSchema => graphql(executableSchema, query));
}

const query = `
{
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
  return pify(access)(options.schemaFile)
    .then(
      () => executeLocalQuery(options.schemaFile, query),
      () => executeRemoteQuery(options.graphqlUri, options.headers, query)
    )
    .then(result => writeFragmentTypesFile(options.fragmentsFile, result));
};
