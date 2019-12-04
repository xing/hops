const { existsSync } = require('fs');
const { Mixin } = require('hops-mixin');
const strip = require('strip-indent');

class GraphQLMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs) {
    const { allLoaderConfigs } = loaderConfigs;

    allLoaderConfigs.splice(allLoaderConfigs.length - 1, 0, {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    });
  }

  registerCommands(yargs) {
    yargs.command('graphql', 'Execute GraphQL specific tasks', yargs =>
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
                if (typeof this.getLogger === 'function') {
                  this.getLogger().info('Fetched and saved GraphQL fragments');
                }
              })
              .catch(err => {
                if (typeof this.getLogger === 'function') {
                  this.getLogger().error('Could not fetch GraphQL fragments:');
                  this.getLogger().error(err);
                }
              });
          },
        })
        .help('help')
        .alias('h', 'help')
        .demandCommand()
    );
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }

  diagnose({ detectDuplicatePackages }) {
    detectDuplicatePackages('graphql');
    if (!existsSync(this.config.fragmentsFile)) {
      return [
        `Could not find a graphql introspection query result at "${this.config.fragmentsFile}".`,
        'You might need to execute "hops graphql introspect"',
      ];
    }
  }
}

module.exports = GraphQLMixin;
