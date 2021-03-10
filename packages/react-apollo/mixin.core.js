const { existsSync } = require('fs');
const { join } = require('path');
const { Mixin } = require('hops-mixin');
const strip = require('strip-indent');

class GraphQLMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs) {
    const { allLoaderConfigs } = loaderConfigs;

    if (
      !allLoaderConfigs.find(({ loader }) => loader === 'graphql-tag/loader')
    ) {
      allLoaderConfigs.splice(allLoaderConfigs.length - 1, 0, {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
      });
    }
  }

  registerCommands(yargs) {
    yargs.command('graphql', 'Execute GraphQL specific tasks', (yargs) =>
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
          handler: (argv) => {
            const manifest = require(join(this.config.rootDir, 'package.json'));
            const hasApollo3 = [
              ...Object.keys(manifest.dependencies || {}),
              ...Object.keys(manifest.devDependencies || {}),
            ].includes('@apollo/client');

            require('./lib/fragments')({
              apolloVersion: hasApollo3 ? 3 : 2,
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
              .catch((err) => {
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

  diagnose({ detectDuplicatePackages, pushWarning }) {
    detectDuplicatePackages('graphql');
    if (!existsSync(this.config.fragmentsFile)) {
      pushWarning(
        `Could not find a graphql introspection query result at "${this.config.fragmentsFile}".`
      );
      pushWarning('You might need to execute "hops graphql introspect"');
    }
  }
}

module.exports = GraphQLMixin;
