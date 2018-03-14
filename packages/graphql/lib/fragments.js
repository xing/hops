/* global fetch */
'use strict';

require('isomorphic-fetch');
var fs = require('fs');
var pify = require('pify');
var graphql = require('graphql').graphql;
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

var hopsConfig = require('hops-config');

var fragmentsFile = require('./util').getFragmentsFile();

function writeFragmentTypesFile(result) {
  result.data.__schema.types = result.data.__schema.types.filter(function(t) {
    return t.possibleTypes !== null;
  });
  return pify(fs.writeFile)(fragmentsFile, JSON.stringify(result.data));
}

function executeRemoteQuery(graphqlUri, query) {
  return fetch(graphqlUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query }),
  }).then(function(result) {
    return result.json();
  });
}

function executeLocalQuery(schemaFile, query) {
  return pify(fs.readFile)(schemaFile, 'utf-8')
    .then(function(schema) {
      return makeExecutableSchema({ typeDefs: schema });
    })
    .then(function(executableSchema) {
      return graphql(executableSchema, query);
    });
}

var query = [
  '{',
  '  __schema {',
  '    types {',
  '      kind',
  '      name',
  '      possibleTypes {',
  '        name',
  '      }',
  '    }',
  '  }',
  '}',
].join('\n');

module.exports = function generateFragmentTypes() {
  return pify(fs.access)(hopsConfig.graphqlSchemaFile)
    .then(
      function() {
        return executeLocalQuery(hopsConfig.graphqlSchemaFile, query);
      },
      function() {
        return executeRemoteQuery(hopsConfig.graphqlUri, query);
      }
    )
    .then(writeFragmentTypesFile);
};
