const { Mixin } = require('hops-mixin');

const failedResponse = {
  errors: [
    {
      message: 'Cannot query field "fooo".',
      locations: [],
    },
  ],
};
const erroneousResponse = {
  data: { foo: 'bar' },
  errors: [
    {
      message: 'Could not resolve fields',
      path: ['bar'],
      locations: [
        {
          line: '3',
          column: '3',
        },
      ],
      id: 'RESOLVE_ERROR',
      details: {},
    },
  ],
};

class GraphQlMixin extends Mixin {
  configureServer(app, middlewares) {
    middlewares.preinitial.push((_, res, next) =>
      this.getServerAddress().then((serverAddress) => {
        res.locals.serverAddress = serverAddress;
        next();
      })
    );
    middlewares.initial.push({
      path: '/graphql/failed',
      method: 'post',
      handler: (_, res) => res.status(400).json(failedResponse),
    });
    middlewares.initial.push({
      path: '/graphql/erroneous',
      method: 'post',
      handler: (_, res) => res.json(erroneousResponse),
    });
    middlewares.initial.push({
      path: '/graphql/html',
      method: 'post',
      handler: (_, res) => res.send('<h1>Moini!</h1>'),
    });
    middlewares.initial.push({
      path: '/graphql/blocked',
      method: 'post',
      handler: (_, res) => res.status(429).send('Too many requests'),
    });

    return app;
  }
}

module.exports = GraphQlMixin;
