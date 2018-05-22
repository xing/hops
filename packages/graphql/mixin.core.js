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
            require('./lib/fragments')({
              graphqlUri: this.config.graphqlUri,
              schemaFile: this.config.graphqlSchemaFile,
              fragmentsFile: this.config.fragmentsFile,
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

  configureWebpack(config, loaderConfigs) {
    const { allLoaderConfigs } = loaderConfigs;
    const tagLoader = {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    };
    allLoaderConfigs.splice(allLoaderConfigs.length - 1, 0, tagLoader);
    return config;
  }
}

module.exports = GraphQLMixin;
