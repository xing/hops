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
    const registerBrowserMock = (mock) =>
      worker.use(createBrowserMock({ graphql, rest }, mock));

    window.hopsMswMocksReset = () => worker.resetHandlers();
    window.hopsMswMocks = window.hopsMswMocks || [];
    window.hopsMswMocks.push = (mock) => registerBrowserMock(mock);
    window.hopsMswMocks.forEach((mock) => registerBrowserMock(mock));

    return worker.start({
      serviceWorker: {
        url: this.config.mockServiceWorkerUri,
      },
      options: {
        scope: this.config.basePath || '/',
      },
    });
  }
}

export default MswMixin;
