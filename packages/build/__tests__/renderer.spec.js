/* eslint-env node, jest */

var createRenderer = require('..').createRenderer;

var goodConfig = require('./fixtures/webpack.good');
var badExportConfig = require('./fixtures/webpack.bad-export');
var badHandlerConfig = require('./fixtures/webpack.bad-handler');

describe('renderer', function() {
  jest.setTimeout(100000);

  it('should export a function', function() {
    expect(typeof createRenderer).toBe('function');
  });

  it('should create a renderer function', function() {
    var render = createRenderer(goodConfig);
    expect(typeof render).toBe('function');
  });

  describe('function', function() {
    it('should return a promise', function() {
      var render = createRenderer(goodConfig);
      var promise = render('/');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('should render expected result', function() {
      var render = createRenderer(goodConfig);
      return expect(render('/')).resolves.toBe('Hello World!');
    });

    it('should reject promise (bad export)', function() {
      var render = createRenderer(badExportConfig);
      return expect(render('/')).rejects.toThrow();
    });

    it('should reject promise (bad handler)', function() {
      var render = createRenderer(badHandlerConfig);
      return expect(render('/')).rejects.toThrow();
    });
  });
});
