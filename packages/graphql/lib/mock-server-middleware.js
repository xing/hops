import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import hopsConfig from 'hops-config';
import schema from 'hops-graphql/schema';

const apolloAppPromise = Promise.resolve(
  typeof schema === 'function' ? schema() : schema
).then(resolvedSchema => {
  const app = express();
  app.use(cookieParser());

  const server = new ApolloServer({
    schema: resolvedSchema,
    playground: {
      settings: {
        'request.credentials': 'same-origin',
      },
    },
    context: context => ({ ...context, config: hopsConfig }),
  });

  server.applyMiddleware({
    app,
    path: hopsConfig.graphqlMockServerPath,
    cors: {
      credentials: true,
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'content-type',
    },
  });

  return app;
});

export default (req, res, next) => {
  apolloAppPromise.then(app => app.handle(req, res, next), next);
};
