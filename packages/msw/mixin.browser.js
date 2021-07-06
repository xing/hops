/* eslint-env browser */

import { Mixin } from 'hops-mixin';

const createBrowserMock = (
  { graphql, rest },
  { type, method, identifier, data }
) => {
  switch (type) {
    case 'graphql': {
      if (typeof graphql[method] !== 'function') {
        throw new Error(`Invalid method "${method}" given for type "${type}"`);
      }
      return graphql[method](identifier, (_, res, ctx) => res(ctx.data(data)));
    }
    case 'rest': {
      if (typeof rest[method] !== 'function') {
        throw new Error(`Invalid method "${method}" given for type "${type}"`);
      }
      return rest[method](identifier, (_, res, ctx) =>
        res(
          ctx.status(200),
          typeof data === 'undefined' ? undefined : ctx.json(data)
        )
      );
    }
    default:
      throw new Error(`Invalid type "${type}" given`);
  }
};

class MswMixin extends Mixin {
  async bootstrap() {
    if (this.config.enableMockServiceWorker !== 'true') {
      return;
    }

    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const { setupWorker, graphql, rest } = await import('msw');
    const worker = setupWorker();
    const registerBrowserMock = (mock) => {
      worker.use(createBrowserMock({ graphql, rest }, mock));
    };

    window.hopsMswMocksReset = () => worker.resetHandlers();
    window.hopsMswMocks = window.hopsMswMocks || [];
    window.hopsMswMocks.push = (...mocks) => {
      mocks.forEach((mock) => registerBrowserMock(mock));
      window.hopsMswMocksReady();
    };
    window.hopsMswMocks.forEach((mock) => registerBrowserMock(mock));

    await worker.start({
      serviceWorker: {
        url: this.config.mockServiceWorkerUri,
      },
      options: {
        scope: this.config.basePath || '/',
      },
    });

    return new Promise((resolve) => {
      window.hopsMswMocksReady = () => resolve();
      if (window.hopsMswMocks.length > 0) {
        window.hopsMswMocksReady();
      }
    });
  }
}

export default MswMixin;
