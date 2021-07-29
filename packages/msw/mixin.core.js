const { Mixin } = require('hops-mixin');
const debug = require('hops-debug')('hops:msw:core');

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
      debug('handlers file exists - registering the webpack alias now');
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
    const cookieParser = require('cookie-parser');

    let mockServiceWorker;
    const mockServer = setupServer();

    if (exists(this.config.mockServiceWorkerHandlersFile)) {
      debug('handlers file exists - registering the server handlers now');
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
      method: 'options',
      path: '/_msw/register',
      handler: (req, res) => {
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        });
        res.status(200).end();
      },
    });

    middlewares.initial.push({
      method: 'post',
      path: '/_msw/register',
      handler: [
        bodyParserJson(),
        cookieParser(),
        (req, res) => {
          const { mocks } = req.body;

          debug('/_msw/register called with:', mocks);

          res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          });

          res.cookie('mswWaitForBrowserMocks', 'true');

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
      handler: [
        cookieParser(),
        (_, res) => {
          debug('/_msw/reset called');

          mockServer.resetHandlers();

          res.clearCookie('mswWaitForBrowserMocks');

          res.type('text/plain').end('ok');
        },
      ],
    });
  }
};
