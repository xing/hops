const { existsSync } = require('fs');
const { Mixin } = require('hops-mixin');
const strip = require('strip-indent');
const {
  internal: { createWebpackMiddleware, StatsFilePlugin },
} = require('@untool/webpack');

function exists(path) {
  try {
    require.resolve(path);
    return true;
  } catch (e) {
    return false;
  }
}

class GraphQLMixin extends Mixin {
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

  configureServer(rootApp, middleware) {
    if (
      !exists(this.config.graphqlMockSchemaFile) ||
      process.env.NODE_ENV === 'production'
    ) {
      return;
    }

    middleware.initial.push({
      path: this.config.graphqlMockServerPath,
      handler: createWebpackMiddleware(
        this.getBuildConfig('graphql-mock-server', 'node'),
        true
      ),
    });
  }

  configureBuild(webpackConfig, loaderConfigs, target) {
    const { allLoaderConfigs } = loaderConfigs;

    allLoaderConfigs.splice(allLoaderConfigs.length - 1, 0, {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    });

    webpackConfig.externals.push('encoding');

    if (process.env.NODE_ENV === 'production') {
      return;
    }

    if (exists(this.config.graphqlMockSchemaFile)) {
      webpackConfig.resolve.alias['hops-graphql/schema'] = require.resolve(
        this.config.graphqlMockSchemaFile
      );
    }

    if (target === 'graphql-mock-server') {
      webpackConfig.externals.push(
        'apollo-server-express',
        'express',
        'graphql'
      );

      webpackConfig.output.filename = 'hops-graphql-mock-server.js';
      webpackConfig.resolve.alias['@untool/entrypoint'] = require.resolve(
        './lib/mock-server-middleware'
      );

      webpackConfig.plugins = webpackConfig.plugins.filter(
        p => !(p instanceof StatsFilePlugin)
      );
    }
  }

  diagnose() {
    if (!existsSync(this.config.fragmentsFile)) {
      return [
        `Could not find a graphql introspection query result at "${
          this.config.fragmentsFile
        }".`,
        'You might need to execute "hops graphql introspect"',
      ];
    }
  }
}

module.exports = GraphQLMixin;
