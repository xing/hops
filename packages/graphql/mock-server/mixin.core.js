const watch = require('node-watch');
const { join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const fetch = require('cross-fetch');
const { readFile } = require('fs');
const { promisify } = require('util');
const { ApolloServer } = require('apollo-server-express');
const { Mixin } = require('hops-mixin');
const { print } = require('graphql');
const {
  makeRemoteExecutableSchema,
  makeExecutableSchema,
  mergeSchemas,
  addMockFunctionsToSchema,
  introspectSchema,
} = require('graphql-tools');
const { sync: resolve } = require('enhanced-resolve');

const mapRemoteSchemaOptions = value => {
  return typeof value === 'string' || value instanceof String
    ? { url: value }
    : { ...value };
};

const tryRequire = path => {
  try {
    return require(path);
  } catch (e) {
    console.warn(`Skip: can't load ${path}.`);
    return null;
  }
};

const tryResolveEnhanced = (rootDir, name) => {
  try {
    return resolve(rootDir, join(rootDir, name));
  } catch (e) {
    console.warn(`Skip: can't load ${name}.`);
    return null;
  }
};

module.exports = class GraphQLMockServerMixin extends Mixin {
  constructor(...args) {
    super(...args);

    this.schema = makeExecutableSchema({
      typeDefs: `type Query { empty: String }`,
    });
    this.graphqlMockServerConfig = {
      schemaMocks: [],
      remoteSchemas: [],
      ...tryRequire(this.config.graphqlMockConfigFile),
    };
  }

  async fetcher({ query, variables, operationName, url, headers }) {
    const fetchResult = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: print(query), variables, operationName }),
    });
    return fetchResult.json();
  }

  loadMockFeatureMaps() {
    const { rootDir } = this.config;
    const { schemaMocks = [] } = this.graphqlMockServerConfig;

    return schemaMocks.map(name => {
      return {
        schema: tryResolveEnhanced(rootDir, join(name, 'schema.graphql')),
        resolvers: tryResolveEnhanced(rootDir, join(name, 'resolvers.js')),
        mocks: tryResolveEnhanced(rootDir, join(name, 'mocks.js')),
      };
    });
  }

  loadResolvers(mockFeatureMaps) {
    return mockFeatureMaps
      .filter(({ resolvers: path }) => path)
      .map(({ resolvers: path }) => {
        delete require.cache[path];
        return tryRequire(path);
      });
  }

  async loadSchemas(mockFeatureMaps) {
    const localSchemas = mockFeatureMaps.map(async ({ schema: path }) => {
      try {
        const buffer = await promisify(readFile)(path);
        return buffer.toString('utf-8');
      } catch (e) {
        return null;
      }
    });

    return Promise.all(localSchemas);
  }

  loadMocks(mockFeatureMaps) {
    return mockFeatureMaps
      .filter(({ mocks }) => mocks)
      .map(({ mocks: path }) => {
        delete require.cache[path];
        return { path, mocks: tryRequire(path) };
      });
  }

  async updateMocks(mockFeatureMaps, allRemoteSchemas) {
    let mergedSchema;

    const resolvers = this.loadResolvers(mockFeatureMaps);

    const [remoteSchemas, localTypeDefs] = await Promise.all([
      allRemoteSchemas,
      this.loadSchemas(mockFeatureMaps),
    ]);

    try {
      const typeDefs = localTypeDefs.filter(Boolean);
      if (!typeDefs.length) return;

      const localSchema = makeExecutableSchema({
        typeDefs,
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
      });

      const schemas = [...remoteSchemas.filter(Boolean), localSchema];
      if (!schemas.length) return;

      mergedSchema = mergeSchemas({
        schemas,
        resolvers,
      });
    } catch (error) {
      console.warn('Skip: GraphQL schemas merge failed.', error);
    }

    if (!this.schema) {
      this.schema = mergedSchema;
    } else {
      Object.assign(this.schema, mergedSchema);
    }

    this.loadMocks(mockFeatureMaps).forEach(({ path, mocks = {} }) => {
      try {
        addMockFunctionsToSchema({
          schema: this.schema,
          mocks,
          preserveResolvers: true,
        });
        console.log(`Using mocks from ${path}`);
      } catch (e) {
        console.warn(`Skip: can't use mocks from ${path}`, e);
      }
    });
  }

  configureServer(rootApp, middlewares) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        'Skip: GraphQL Mock-Server is not supported in production mode.'
      );
      return rootApp;
    }

    const app = express();
    app.use(cookieParser());

    const {
      remoteSchemas = [],
      middlewareConfig = {},
    } = this.graphqlMockServerConfig;

    const remoteSchemaOptions = remoteSchemas.map(value =>
      mapRemoteSchemaOptions(value)
    );

    const remoteSchemaFiles = remoteSchemaOptions.map(fetcherOptions => {
      return introspectSchema(options =>
        this.fetcher({ ...options, ...fetcherOptions })
      ).catch(() => {
        console.warn(
          `Skip: Can't introspect schema from ${fetcherOptions.url}`
        );
        return null;
      });
    });

    const allRemoteSchemas = Promise.all(remoteSchemaFiles).then(
      remoteSchemaFile =>
        remoteSchemaFile.filter(x => x).map((schema, idx) =>
          makeRemoteExecutableSchema({
            schema,
            fetcher: options =>
              this.fetcher({ ...options, ...remoteSchemaOptions[idx] }),
          })
        )
    );

    const mockFeatureMaps = this.loadMockFeatureMaps();

    this.updateMocks(mockFeatureMaps, allRemoteSchemas).then(() => {
      if (!this.schema) return;

      const server = new ApolloServer({
        schema: this.schema,
        context: ({ req }) => ({ req, config: this.config }),
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
      });

      server.applyMiddleware({
        ...middlewareConfig,
        app,
      });
    });

    middlewares.preroutes.push(app);

    const filesToWatch = mockFeatureMaps.reduce(
      (files, { schema, resolvers, mocks }) =>
        files.concat([schema, resolvers, mocks]).filter(x => x),
      []
    );
    watch(filesToWatch, (_, name) => {
      console.log(`GraphQL mock file (${name}) was updated.`);
      this.updateMocks(mockFeatureMaps, allRemoteSchemas);
    });

    return rootApp;
  }
};
