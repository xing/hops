/* eslint-env jest */

jest.mock('http-proxy-middleware', () => {
  const replacer = (key, value) => {
    return typeof value === 'function' ? value.toString() : value;
  };
  return jest.fn((context, options) => {
    return `proxy(${JSON.stringify(context, replacer)}, ${JSON.stringify(
      options,
      replacer
    )})`;
  });
});
const CoreMixin = require('../mixin.core');

const simpleConfig = { proxy: 'http://localhost' };
const complexConfig = {
  proxy: {
    '/foo': {
      target: 'http://localhost',
      headers: {
        'X-Foo': 'foo',
      },
    },
    '/bar': {
      target: 'http://localhost',
      headers: {
        'X-Bar': 'bar',
      },
    },
  },
};

describe('development proxy core mixin', () => {
  let app;
  let middlewares;

  beforeEach(() => {
    app = {};
    middlewares = { initial: [] };
  });

  it('should do nothing when no proxy config is present', () => {
    const mixin = new CoreMixin({});
    mixin.configureServer(app, middlewares, '');

    expect(app).toEqual({});
    expect(middlewares).toEqual({ initial: [] });
  });

  it('should do nothing when not started in development mode', () => {
    const mixin = new CoreMixin(simpleConfig);
    mixin.configureServer(app, middlewares, 'serve');

    expect(app).toEqual({});
    expect(middlewares).toEqual({ initial: [] });
  });

  it('should add proxy middleware for simple endpoint config', () => {
    const mixin = new CoreMixin(simpleConfig);
    mixin.configureServer(app, middlewares, 'develop');

    expect(app).toEqual({});
    expect(middlewares).toMatchInlineSnapshot(`
Object {
  "initial": Array [
    "proxy(\\"(pathName, req) => {\\\\n        return req.headers.accept && !req.headers.accept.includes('text/html');\\\\n      }\\", {\\"target\\":\\"http://localhost\\",\\"changeOrigin\\":true,\\"logLevel\\":\\"warn\\"})",
  ],
}
`);
  });

  it('should add proxy middleware for complex proxy config', () => {
    const mixin = new CoreMixin(complexConfig);
    mixin.configureServer(app, middlewares, 'develop');

    expect(app).toEqual({});
    expect(middlewares).toMatchInlineSnapshot(`
Object {
  "initial": Array [
    "proxy(\\"/foo\\", {\\"changeOrigin\\":true,\\"logLevel\\":\\"warn\\",\\"target\\":\\"http://localhost\\",\\"headers\\":{\\"X-Foo\\":\\"foo\\"}})",
    "proxy(\\"/bar\\", {\\"changeOrigin\\":true,\\"logLevel\\":\\"warn\\",\\"target\\":\\"http://localhost\\",\\"headers\\":{\\"X-Bar\\":\\"bar\\"}})",
  ],
}
`);
  });
});
