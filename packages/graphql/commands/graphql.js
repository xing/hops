#!/usr/bin/env node
'use strict';

var fetchFragments = require('../lib/fragments');

module.exports = function defineGraphQLCommand(args) {
  args.command('graphql', 'Execute GraphQL specific tasks', function(yargs) {
    return yargs
      .usage('Usage: hops-graphql <command>')
      .command({
        command: 'introspect',
        describe: 'Fetches GraphQL schema information for introspection',
        builder: {},
        handler: function graphqlHandler(argv) {
          fetchFragments()
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
  require('hops-local-cli').run(module.exports, 'graphql');
}
