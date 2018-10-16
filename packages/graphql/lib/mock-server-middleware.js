const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const express = require('express');
const hopsConfig = require('hops-config');
const { isSchema } = require('graphql');

/* eslint-disable node/no-missing-require */
// this is an alias (defined in mixin.core.js) to the user-supplied mock schema
// file.
let schema = require('hops-graphql/schema');
/* eslint-enable node/no-missing-require */
if (!isSchema(schema)) {
  if (typeof schema === 'function') {
    schema = schema();
  } else if (isSchema(schema.default)) {
    schema = schema.default;
  } else if (typeof schema.default === 'function') {
    schema = schema.default();
  } else {
    throw new Error(
      `Invalid schema exported in ${hopsConfig.graphqlMockSchemaFile}`
    );
  }
}

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
  Promise.resolve(schema).then(schema => {
    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req, config: hopsConfig }),
    });

    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'content-type',
      },
    });

    app.handle(req, res, next);
  });
};
