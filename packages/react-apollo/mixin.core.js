const { existsSync } = require('fs');
const { Mixin } = require('hops-mixin');
const { join } = require('path');
const strip = require('strip-indent');
const deprecate = require('depd')('hops-react-apollo');
const { getApolloVersion } = require('./lib/apollo-version');

class GraphQLMixin extends Mixin {
  constructor(config, ...args) {
    super(config, ...args);

    // TODO: remove with Hops v15
    this.apolloVersion = getApolloVersion();
    if (this.apolloVersion === 2) {
      deprecate(
        '[DEP0006] Apollo v2 support in Hops has been deprecated and will be removed with Hops v15. Please upgrade to Apollo v3 (https://github.com/xing/hops/blob/master/DEPRECATIONS.md#dep006).'
      );
    }
  }

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
            require('./lib/fragments')({
              apolloVersion: this.apolloVersion,
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

  diagnose({ detectDuplicatePackages, pushWarning, pushError }) {
    detectDuplicatePackages('graphql');
    if (!existsSync(this.config.fragmentsFile)) {
      pushWarning(
        `Could not find a graphql introspection query result at "${this.config.fragmentsFile}".`
      );
      pushWarning('You might need to execute "hops graphql introspect"');
    }

    const manifestPath = join(this.config.rootDir, 'package.json');
    const manifest = require(manifestPath);
    const hasReactApollo = [
      ...Object.keys(manifest.dependencies || {}),
      ...Object.keys(manifest.devDependencies || {}),
    ].includes('react-apollo');
    const hasApolloClient = [
      ...Object.keys(manifest.dependencies || {}),
      ...Object.keys(manifest.devDependencies || {}),
    ].includes('@apollo/client');

    if (hasReactApollo && hasApolloClient) {
      pushError(
        'apollo-version-mismatch',
        `
Found two conflicting versions of apollo (react-apollo and @apollo/client) in "${manifestPath}".
- If you want to use Apollo v2 you need to remove "@apollo/client"
- Otherwise, if you want to use Apollo v3, remove "react-apollo"
`.trim()
      );
    }
  }
}

module.exports = GraphQLMixin;
