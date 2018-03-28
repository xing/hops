/* eslint-env node, jest */

var React = require('react');
var ReactRouter = require('react-router');
var TestRenderer = require('react-test-renderer');
var mocks = require('node-mocks-http');

describe('react node extension', function() {
  var hopsReact;

  beforeEach(function() {
    hopsReact = require('../node');
  });

  describe('ReactContext', function() {
    it('should have all the neccessary exports', function() {
      expect(typeof hopsReact.ReactContext).toBe('function');
      expect(typeof hopsReact.contextDefinition).toBe('function');
      expect(typeof hopsReact.createContext).toBe('function');
      expect(hopsReact.ReactContext).toBe(hopsReact.contextDefinition);
    });

    it('should wrap the application in a React-Router StaticRouter', function() {
      var context = new hopsReact.ReactContext();
      var root = React.createElement('main');

      var enhanced = context.enhanceElement(root);

      expect(enhanced).toMatchSnapshot();
    });

    it('should use path from passed-in request as location', function() {
      var context = new hopsReact.ReactContext({ request: { path: '/foo' } });
      var root = React.createElement('main');

      var enhanced = context.enhanceElement(root);

      expect(enhanced.props).toMatchObject({
        location: '/foo',
      });
    });

    it('should return serialized template data', function() {
      var context = new hopsReact.ReactContext();

      expect(context.getTemplateData({})).toMatchObject({
        routerContext: {},
        globals: [],
        assets: undefined,
      });
    });

    it('should read assets from response.locals', function() {
      var context = new hopsReact.ReactContext({
        response: {
          locals: { hops: { assets: { js: ['main.js'], css: ['main.css'] } } },
        },
      });

      expect(context.getTemplateData({})).toMatchObject({
        assets: {
          js: ['main.js'],
          css: ['main.css'],
        },
      });
    });

    it('should render the template with templateData', function() {
      var context = new hopsReact.ReactContext();

      var template = context.renderTemplate({
        assets: {
          css: [],
          js: [],
        },
        globals: [],
      });

      expect(template).toMatchSnapshot();
    });

    it('should include all assets and globals in rendered template', function() {
      var context = new hopsReact.ReactContext();

      var template = context.renderTemplate({
        assets: {
          css: ['main.css', 'vendor.css'],
          js: ['main.js', 'vendor.js'],
        },
        globals: [{ name: 'myVariable', value: 'myValue' }],
      });

      expect(template).toMatchSnapshot();
    });

    it('should pass options.router to the StaticRouter', function() {
      var staticRouterContext = {};
      var context = new hopsReact.ReactContext({
        router: { context: staticRouterContext },
      });

      var enhanced = context.enhanceElement(React.createElement('main'));

      expect(enhanced.props.context).toBe(staticRouterContext);
    });
  });

  describe('combineContexts', function() {
    var Context1, Context2, context;

    beforeEach(function() {
      function bootstrap() {
        return { instance: this, method: 'bootstrap' };
      }
      function enhanceElement() {
        return {
          instance: this,
          method: 'enhanceElement',
          arguments: arguments,
        };
      }
      function getTemplateData() {
        return {
          instance: this,
          method: 'getTemplateData',
          arguments: arguments,
        };
      }
      function renderTemplate() {
        return {
          instance: this,
          method: 'renderTemplate',
          arguments: arguments,
        };
      }

      Context1 = function() {};
      Context1.prototype.bootstrap = bootstrap;
      Context1.prototype.enhanceElement = enhanceElement;
      Context1.prototype.getTemplateData = getTemplateData;
      Context1.prototype.renderTemplate = renderTemplate;

      Context2 = function() {};
      Context2.prototype.bootstrap = bootstrap;
      Context2.prototype.enhanceElement = enhanceElement;
      Context2.prototype.getTemplateData = getTemplateData;
      Context2.prototype.renderTemplate = renderTemplate;

      context = hopsReact.combineContexts(Context1, Context2)();
    });

    it('should run bootstrap in parallel', function() {
      return context.bootstrap().then(function(results) {
        expect(results[0].instance).toBeInstanceOf(Context1);
        expect(results[0].method).toBe('bootstrap');

        expect(results[1].instance).toBeInstanceOf(Context2);
        expect(results[1].method).toBe('bootstrap');
      });
    });

    it('should compose enhanceElement methods', function() {
      return context.enhanceElement('root').then(function(result) {
        expect(result.instance).toBeInstanceOf(Context1);
        expect(result.method).toBe('enhanceElement');
        expect(result.arguments.length).toBe(1);
        expect(result.arguments[0].instance).toBeInstanceOf(Context2);
        expect(result.arguments[0].method).toBe('enhanceElement');
        expect(result.arguments[0].arguments.length).toBe(1);
        expect(result.arguments[0].arguments[0]).toBe('root');
      });
    });

    it('should pipe getTemplateData methods', function() {
      var initialTemplateData = {};
      return context
        .getTemplateData(initialTemplateData)
        .then(function(result) {
          expect(result.instance).toBeInstanceOf(Context2);
          expect(result.method).toBe('getTemplateData');
          expect(result.arguments.length).toBe(1);
          expect(result.arguments[0].instance).toBeInstanceOf(Context1);
          expect(result.arguments[0].method).toBe('getTemplateData');
          expect(result.arguments[0].arguments.length).toBe(1);
          expect(result.arguments[0].arguments[0]).toBe(initialTemplateData);
        });
    });

    it('should overwrite renderTemplate', function() {
      var templateData = {};
      var result = context.renderTemplate(templateData);

      expect(result.instance).toBeInstanceOf(Context2);
      expect(result.method).toBe('renderTemplate');
      expect(result.arguments.length).toBe(1);
      expect(result.arguments[0]).toBe(templateData);
    });
  });

  describe('render', function() {
    var request, response, next;

    beforeAll(function() {
      jest.mock('mixinable', function() {
        return Object.assign(require.requireActual('mixinable'), {
          isMixinable: function() {
            return true;
          },
          replicate: function() {
            return function(context) {
              return context;
            };
          },
        });
      });
    });

    beforeEach(function() {
      jest.resetModules();

      hopsReact = require('../node');

      request = mocks.createRequest();
      response = mocks.createResponse({
        locals: {
          timings: {
            start: jest.fn(),
            end: jest.fn(),
          },
          hops: {
            assets: {
              js: [],
              css: [],
            },
          },
        },
      });
      next = jest.fn();
    });

    afterEach(function() {
      jest.resetAllMocks();
    });

    it('should execute the bootstrap method', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      context.bootstrap = jest.fn(function() {
        return Promise.resolve();
      });

      return render(request, response, next).then(function() {
        expect(context.bootstrap).toBeCalled();
      });
    });

    it('should execute enhanceElement', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      context.enhanceElement = jest.fn();

      return render(request, response, next).then(function() {
        expect(context.enhanceElement).toHaveBeenCalledWith(root);
      });
    });

    it('should execute getTemplateData', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      context.getTemplateData = jest.fn();

      return render(request, response, next).then(function() {
        expect(context.getTemplateData).toHaveBeenCalled();
        expect(context.getTemplateData).toMatchSnapshot();
      });
    });

    it('should execute renderTemplate', function() {
      var root = React.createElement('main');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      context.renderTemplate = jest.fn();

      return render(request, response, next).then(function() {
        expect(context.renderTemplate).toHaveBeenCalledWith({
          assets: undefined,
          globals: [],
          markup: '<main data-reactroot=""></main>',
          routerContext: {},
        });
      });
    });

    it('should send the rendered markup to the client', function() {
      var root = React.createElement('main');
      var context = hopsReact.createContext({
        request: request,
        response: response,
      });
      var render = hopsReact.render(root, context);

      return render(request, response, next).then(function() {
        expect(response._headers).toMatchObject({
          'Content-Type': 'text/html',
        });
        expect(response.statusCode).toBe(200);
        expect(response._getData()).toMatchSnapshot();
      });
    });

    it('should continue when routerContext.miss is set', function() {
      var root = React.createElement('main');
      var context = hopsReact.createContext({
        request: request,
        response: response,
        router: {
          context: { miss: true },
        },
      });
      var render = hopsReact.render(root, context);

      return render(request, response, next).then(function() {
        expect(response.headersSent).toBe(false);
        expect(next).toHaveBeenCalledWith();
      });
    });

    it('should redirecet when routerContext.url is set', function() {
      var root = React.createElement('main');
      var context = hopsReact.createContext({
        request: request,
        response: response,
        router: {
          context: { url: '/other' },
        },
      });
      var render = hopsReact.render(root, context);

      return render(request, response, next).then(function() {
        expect(response.finished).toBe(true);
        expect(response._headers).toMatchObject({
          Location: '/other',
        });
      });
    });

    it('should call bootstrap, enhanceElement, getTemplateData and renderTemplate in this order', function() {
      var root = React.createElement('div');
      function Context() {}
      Context.callOrder = [];
      Context.prototype.bootstrap = function() {
        Context.callOrder.push('bootstrap');
        return Promise.resolve();
      };
      Context.prototype.enhanceElement = function() {
        Context.callOrder.push('enhanceElement');
        return '<enhancedElement />';
      };
      Context.prototype.getTemplateData = function() {
        Context.callOrder.push('getTemplateData');
        return {};
      };
      Context.prototype.renderTemplate = function() {
        Context.callOrder.push('renderTemplate');
        return '<!doctype html>';
      };

      var context = hopsReact.combineContexts(Context)();
      var render = hopsReact.render(root, context);

      return render(request, response, next).then(function() {
        expect(Context.callOrder).toEqual([
          'bootstrap',
          'enhanceElement',
          'getTemplateData',
          'renderTemplate',
        ]);
      });
    });
  });

  describe('side-effect components', function() {
    var renderWithRouter = function(element, context) {
      return TestRenderer.create(
        React.createElement(
          ReactRouter.StaticRouter,
          { context: context },
          element
        )
      );
    };

    it('<Miss /> should set miss on StaticRouter context', function() {
      var staticRouterContext = {};
      var renderer = renderWithRouter(
        React.createElement(hopsReact.Miss),
        staticRouterContext
      );
      expect(renderer.toJSON()).toMatchSnapshot();
      expect(staticRouterContext).toEqual({ miss: true });
    });

    it('<Status /> should set status code on StaticRouter context', function() {
      var staticRouterContext = {};
      var renderer = renderWithRouter(
        React.createElement(hopsReact.Status, { code: 204 }),
        staticRouterContext
      );
      expect(renderer.toJSON()).toMatchSnapshot();
      expect(staticRouterContext).toEqual({ status: 204 });
    });

    it('<Header /> should set headers on StaticRouter context', function() {
      var staticRouterContext = {};
      var renderer = renderWithRouter(
        React.createElement(hopsReact.Header, {
          name: 'Content-Length',
          value: 1,
        }),
        staticRouterContext
      );
      expect(renderer.toJSON()).toMatchSnapshot();
      expect(staticRouterContext).toEqual({ headers: { 'Content-Length': 1 } });
    });
  });
});
