#!/usr/bin/env node
'use strict';

module.exports = function defineGraphQLCommand(args) {
  args.command('graphql', 'Execute GraphQL specific tasks', function(yargs) {
    return yargs
      .usage(
        'Usage: ' +
          (require.main === module ? 'hops-graphql' : '$0 graphql') +
          ' <command>'
      )
      .command({
        command: 'introspect',
        describe: 'Fetches GraphQL schema information for introspection',
        builder: {
          header: {
            alias: 'H',
            type: 'array',
            default: [],
            describe:
              'Additional HTTP headers to be used when executing the schema ' +
              'introspection on the remote server. Specify this multiple ' +
              'times to add more headers.\nFormat: "Header: Value"',
          },
        },
        handler: function graphqlHandler(argv) {
          var hopsConfig = require('hops-config');
          require('../lib/fragments')({
            graphqlUri: hopsConfig.graphqlUri,
            schemaFile: hopsConfig.graphqlSchemaFile,
            headers: argv.header,
          })
            .then(function() {
              console.log('Fetched and saved GraphQL fragments');
            })
            .catch(function(err) {
              console.error('Could not fetch GraphQL fragments:');
              console.trace(err);
            });
        },
      })
      .help('help')
      .alias('h', 'help')
      .demandCommand();
  });
};

if (require.main === module) {
  require('hops').run(module.exports, 'graphql');
}
