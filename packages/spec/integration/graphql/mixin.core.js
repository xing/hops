const { Mixin } = require('hops-mixin');
const getRawBody = require('raw-body');

class GraphQlMixin extends Mixin {
  configureServer(app, middlewares) {
    middlewares.preinitial.push((_, res, next) =>
      this.getServerAddress().then((serverAddress) => {
        res.locals.serverAddress = serverAddress;
        next();
      })
    );
    middlewares.initial.push({
      path: '/graphql',
      method: 'post',
      handler(req, res, next) {
        getRawBody(req, (error, body) => {
          if (error) {
            return next(error);
          }

          const parsed = JSON.parse(body);

          switch (parsed.variables.type) {
            case 'query-error':
              return res.status(400).json({
                errors: [
                  {
                    message: 'Cannot query field "fooo".',
                    locations: [],
                  },
                ],
              });
            case 'resolve-error':
              return res.json({
                data: { foo: 'bar', bar: null },
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
              });
            case 'invalid-response':
              return res.send('<h1>Moini!</h1>');
            case 'blocked':
              return res.status(429).send('Too many requests');
          }
        });
      },
    });

    return app;
  }
}

module.exports = GraphQlMixin;
