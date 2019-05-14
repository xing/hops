const { Mixin } = require('hops-mixin');

const endpoints = [
  [401, 'Unauthorized'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [429, 'Too Many Requests', { 'Retry-After': '1 year' }],
  [503, 'Service Unavailable'],
];
const endpointHandlers = endpoints.reduce(
  (acc, [statusCode, message, additionalHeaders = {}]) =>
    acc.concat({
      path: `/graphql/${statusCode}`,
      method: 'post',
      handler: (_, res) =>
        res
          .set(additionalHeaders)
          .status(statusCode)
          .send(message),
    }),
  []
);
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
    middlewares.initial.push.apply(middlewares.initial, endpointHandlers);
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

    return app;
  }
}

module.exports = GraphQlMixin;
GraphQlMixin.endpoints = endpoints;
