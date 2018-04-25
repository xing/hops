const { Mixin } = require('@untool/core');
const strip = require('strip-indent');

class GraphQLMixin extends Mixin {
  registerCommands(yargs) {
    return yargs.command('graphql', 'Execute GraphQL specific tasks', yargs =>
      yargs
        .usage('Usage: hops graphql <command>')
        .command({
          command: 'introspect',
          describe: 'Fetches GraphQL schema information for introspection',
          builder: {
            header: {
              alias: 'H',
              type: 'array',
              default: [],
              describe: strip(`
                Additional HTTP headers to be used when executing the schema
                introspection on the remote server. Specify this multiple
                times to add more headers.\nFormat: "Header: Value"
              `),
            },
          },
          handler: argv => {
            const hopsConfig = require('hops-config');
            require('./lib/fragments')({
              graphqlUri: hopsConfig.graphqlUri,
              schemaFile: hopsConfig.graphqlSchemaFile,
              headers: argv.header,
            })
              .then(() => {
                console.log('Fetched and saved GraphQL fragments');
              })
              .catch(err => {
                console.error('Could not fetch GraphQL fragments:');
                console.trace(err);
              });
          },
        })
        .help('help')
        .alias('h', 'help')
        .demandCommand()
    );
  }
}

module.exports = GraphQLMixin;
