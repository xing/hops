const { Mixin } = require('hops-mixin');

function exists(path) {
  try {
    require.resolve(path);
    return true;
  } catch (e) {
    return false;
  }
}

const getMockServiceWorkerContent = () => {
  const { mkdtempSync, readFileSync } = require('fs');
  const { tmpdir } = require('os');
  const { join } = require('path');
  const { sync: execa } = require('execa');

  const dir = mkdtempSync(join(tmpdir(), 'msw-'));

  execa(process.execPath, [
    require.resolve('msw/cli'),
    'init',
    dir,
    '--no-save',
  ]);

  const content = readFileSync(join(dir, 'mockServiceWorker.js'));

  return content;
};

module.exports = class MswMixin extends Mixin {
  configureBuild(webpackConfig) {
    if (exists(this.config.mockServiceWorkerHandlersFile)) {
      webpackConfig.resolve.alias['hops-msw/handlers'] = require.resolve(
        this.config.mockServiceWorkerHandlersFile
      );
    }
  }

  configureServer(app, middlewares) {
    if (process.env.ENABLE_MSW !== 'true') {
      return;
    }

    const { graphql, rest } = require('msw');
    const { setupServer } = require('msw/node');
    const { json: bodyParserJson } = require('body-parser');

    let mockServiceWorker;
    const mockServer = setupServer();

    if (exists(this.config.mockServiceWorkerHandlersFile)) {
      const { handlers } = require(this.config.mockServiceWorkerHandlersFile);

      handlers.forEach((handler) => mockServer.use(handler));
    }

    mockServer.listen();
    process.on('SIGTERM', () => mockServer.close());

    middlewares.files.push({
      path: this.config.mockServiceWorkerUri,
      handler: (_, res) => {
        if (!mockServiceWorker) {
          mockServiceWorker = getMockServiceWorkerContent();
        }

        res.setHeader('content-type', 'application/javascript');
        res.end(mockServiceWorker);
      },
    });

    middlewares.initial.push({
      method: 'post',
      path: '/_msw/register',
      handler: [
        bodyParserJson(),
        (req, res) => {
          const { mocks } = req.body;

          // setting this on `app.locals`, because it is a "global" and
          // affects all following requests
          app.locals.mswWaitForBrowserMocks = true;

          mocks.forEach(({ type, method, identifier, data }) => {
            switch (type) {
              case 'graphql': {
                if (typeof graphql[method] !== 'function') {
                  throw new Error(
                    `Invalid method "${method}" given for type "${type}"`
                  );
                }
                mockServer.use(
                  graphql[method](identifier, (_, res, ctx) =>
                    res(ctx.data(data))
                  )
                );
                break;
              }
              case 'rest': {
                if (typeof rest[method] !== 'function') {
                  throw new Error(
                    `Invalid method "${method}" given for type "${type}"`
                  );
                }
                mockServer.use(
                  rest[method](identifier, (_, res, ctx) =>
                    res(
                      ctx.status(200),
                      typeof data === 'undefined' ? undefined : ctx.json(data)
                    )
                  )
                );
                break;
              }
              default:
                throw new Error(`Invalid type "${type}" given`);
            }
          });

          res.type('text/plain').end('ok');
        },
      ],
    });

    middlewares.initial.push({
      method: 'get',
      path: '/_msw/reset',
      handler: (_, res) => {
        mockServer.resetHandlers();

        app.locals.mswWaitForBrowserMocks = false;

        res.type('text/plain').end('ok');
      },
    });
  }
};
