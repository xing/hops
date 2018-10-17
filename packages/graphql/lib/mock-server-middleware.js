import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import hopsConfig from 'hops-config';
/* eslint-disable import/no-unresolved */
// this is an alias (defined in mixin.core.js) to the user-supplied mock schema
import schema from 'hops-graphql/schema';
/* eslint-enable import/no-unresolved */

const app = express();
app.use(cookieParser());

const schemaPromise = Promise.resolve(
  typeof schema === 'function' ? schema() : schema
);

export default (req, res, next) => {
  schemaPromise.then(schema => {
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
