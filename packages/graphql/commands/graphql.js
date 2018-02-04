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
        builder: {},
        handler: function graphqlHandler(argv) {
          require('../lib/fragments')()
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
