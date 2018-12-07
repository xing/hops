/* eslint-env jest */

jest.mock('compression', () => {
  return jest.fn(() => 'compression');
});

const CoreMixin = require('../mixin.core');

describe('express core mixin', () => {
  let app;
  let middleware;

  const nodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    app = {};
    middleware = { prefiles: [] };

    process.env.NODE_ENV = nodeEnv;
  });

  it('should do nothing when not started in serve mode', () => {
    const mixin = new CoreMixin();
    mixin.configureServer(app, middleware, 'develop');

    expect(app).toEqual({});
    expect(middleware).toEqual({ prefiles: [] });
  });

  it('should do nothing when not started in production mode', () => {
    process.env.NODE_ENV = 'test';

    const mixin = new CoreMixin();
    mixin.configureServer(app, middleware, 'serve');

    expect(app).toEqual({});
    expect(middleware).toEqual({ prefiles: [] });
  });

  it('should add compression middleware when serving in production mode', () => {
    process.env.NODE_ENV = 'production';

    const mixin = new CoreMixin();
    mixin.configureServer(app, middleware, 'serve');

    expect(app).toEqual({});
    expect(middleware).toEqual({ prefiles: ['compression'] });
  });
});
