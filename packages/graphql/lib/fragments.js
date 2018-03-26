/* global fetch */
'use strict';

require('isomorphic-fetch');
var fs = require('fs');
var pify = require('pify');
var graphql = require('graphql').graphql;
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

var fragmentsFile = require('./util').getFragmentsFile();

function writeFragmentTypesFile(result) {
  result.data.__schema.types = result.data.__schema.types.filter(function(t) {
    return t.possibleTypes !== null;
  });
  return pify(fs.writeFile)(fragmentsFile, JSON.stringify(result.data));
}

function executeRemoteQuery(graphqlUri, headers, query) {
  var combinedHeaders = (headers || []).reduce(
    function(headers, header) {
      var parts = header.split(':');
      headers[parts.shift()] = parts.join(':');
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

module.exports = function generateFragmentTypes(options) {
  return pify(fs.access)(options.schemaFile)
    .then(
      function() {
        return executeLocalQuery(options.schemaFile, query);
      },
      function() {
        return executeRemoteQuery(options.graphqlUri, options.headers, query);
      }
    )
    .then(writeFragmentTypesFile);
};
