/* global fetch */
'use strict';

require('isomorphic-fetch');
const fs = require('fs');
const pify = require('pify');
const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const fragmentsFile = require('./util').getFragmentsFile();

function writeFragmentTypesFile(result) {
  result.data.__schema.types = result.data.__schema.types.filter(
    t => t.possibleTypes !== null
  );
  return pify(fs.writeFile)(fragmentsFile, JSON.stringify(result.data));
}

function executeRemoteQuery(graphqlUri, headers = [], query) {
  const combinedHeaders = headers.reduce(
    (headers, header) => {
      const [name, ...value] = header.split(':');
      headers[name] = value.join(':');
      return headers;
    },
    {
      'Content-Type': 'application/json',
    }
  );
  return fetch(graphqlUri, {
    method: 'POST',
    headers: combinedHeaders,
    body: JSON.stringify({ query: query }),
  }).then(result => result.json());
}

function executeLocalQuery(schemaFile, query) {
  return pify(fs.readFile)(schemaFile, 'utf-8')
    .then(schema => makeExecutableSchema({ typeDefs: schema }))
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
}`;

module.exports = function generateFragmentTypes(options) {
  return pify(fs.access)(options.schemaFile)
    .then(
      () => executeLocalQuery(options.schemaFile, query),
      () => executeRemoteQuery(options.graphqlUri, options.headers, query)
    )
    .then(writeFragmentTypesFile);
};
