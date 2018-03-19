/**
 * @jest-environment jsdom
 */
/* eslint-env node, jest */

var React = require('react');
var ReactRouterDOM = require('react-router-dom');
var TestRenderer = require('react-test-renderer');

describe('react browser extension', function() {
  var hopsReact;

  beforeEach(function() {
    document.body.innerHTML = '<div id="main"></div>';
    hopsReact = require('../dom');
  });

  describe('ReactContext', function() {
    it('should have all the neccessary exports', function() {
      expect(typeof hopsReact.ReactContext).toBe('function');
      expect(typeof hopsReact.contextDefinition).toBe('function');
      expect(typeof hopsReact.createContext).toBe('function');
      expect(hopsReact.ReactContext).toBe(hopsReact.contextDefinition);
    });

    it('should wrap the application in a React-Router BrowserRouter', function() {
      var context = new hopsReact.ReactContext();
      var root = React.createElement('main');

      var enhanced = context.enhanceElement(root);

      expect(enhanced).toMatchSnapshot();
    });

    it('should pass options.router to the BrowserRouter', function() {
      var context = new hopsReact.ReactContext({
        router: { forceRefresh: true },
      });

      var enhanced = context.enhanceElement(React.createElement('main'));

      expect(enhanced.props.forceRefresh).toBe(true);
    });

    it('should query the mountpoint', function() {
      var context = new hopsReact.ReactContext();
      expect(context.getMountpoint()).toBe(document.getElementById('main'));
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
      function getMountpoint() {
        return { instance: this, method: 'getMountpoint' };
      }

      Context1 = function() {};
      Context1.prototype.bootstrap = bootstrap;
      Context1.prototype.enhanceElement = enhanceElement;
      Context1.prototype.getMountpoint = getMountpoint;

      Context2 = function() {};
      Context2.prototype.bootstrap = bootstrap;
      Context2.prototype.enhanceElement = enhanceElement;
      Context2.prototype.getMountpoint = getMountpoint;

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

    it('should overwrite getMountpoint methods', function() {
      var result = context.getMountpoint();
      expect(result.instance).toBeInstanceOf(Context2);
      expect(result.method).toBe('getMountpoint');
    });
  });

  describe('render', function() {
    var ReactDOM;

    beforeAll(function() {
      jest.mock('react-dom');
      jest.mock('mixinable', function() {
        return Object.assign(require.requireActual('mixinable'), {
          isMixinable: function() {
            return true;
          },
        });
      });
    });

    beforeEach(function() {
      jest.resetModules();

      hopsReact = require('../dom');
      ReactDOM = require('react-dom');
    });

    afterEach(function() {
      jest.resetAllMocks();
    });

    it('should unmount a previously mounted component', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      return render().then(function() {
        expect(ReactDOM.unmountComponentAtNode).not.toHaveBeenCalled();
        return render().then(function() {
          expect(ReactDOM.unmountComponentAtNode).toBeCalledWith(
            document.getElementById('main')
          );
        });
      });
    });

    it('should execute the bootstrap method', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      context.bootstrap = jest.fn(function() {
        return Promise.resolve();
      });

      return render().then(function() {
        expect(context.bootstrap).toBeCalled();
      });
    });

    it('should execute enhanceElement', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      context.enhanceElement = jest.fn();

      return render().then(function() {
        expect(context.enhanceElement).toHaveBeenCalledWith(root);
      });
    });

    it('should call ReactDOM.hydrate when the app is not yet mounted', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      return render().then(function() {
        expect(ReactDOM.hydrate).toHaveBeenCalledTimes(1);
        expect(ReactDOM.hydrate).toMatchSnapshot();
        expect(ReactDOM.render).not.toHaveBeenCalled();
      });
    });

    it('should call ReactDOM.render when rendering a second time', function() {
      var root = React.createElement('div');
      var context = hopsReact.createContext();
      var render = hopsReact.render(root, context);

      return render().then(function() {
        return render().then(function() {
          expect(ReactDOM.render).toHaveBeenCalledTimes(1);
          expect(ReactDOM.render).toMatchSnapshot();
        });
      });
    });

    it('should call getMountpoint, bootstrap and enhanceElement in this order', function() {
      var root = React.createElement('div');
      function Context() {}
      Context.callOrder = [];
      Context.prototype.getMountpoint = function() {
        Context.callOrder.push('getMountpoint');
        return { hasAttribute: jest.fn(), setAttribute: jest.fn() };
      };
      Context.prototype.bootstrap = function() {
        Context.callOrder.push('bootstrap');
        return Promise.resolve();
      };
      Context.prototype.enhanceElement = function() {
        Context.callOrder.push('enhanceElement');
        return '<enhancedElement />';
      };
      var context = hopsReact.combineContexts(Context)();
      var render = hopsReact.render(root, context);

      return render().then(function() {
        expect(Context.callOrder).toEqual([
          'getMountpoint',
          'bootstrap',
          'enhanceElement',
        ]);
      });
    });
  });

  describe('side-effect components', function() {
    var renderWithRouter = function(element) {
      return TestRenderer.create(
        React.createElement(ReactRouterDOM.BrowserRouter, {}, element)
      );
    };

    it('<Miss /> should render null', function() {
      expect(
        renderWithRouter(React.createElement(hopsReact.Miss)).toJSON()
      ).toMatchSnapshot();
    });

    it('<Status /> should render null', function() {
      expect(
        renderWithRouter(React.createElement(hopsReact.Status)).toJSON()
      ).toMatchSnapshot();
    });

    it('<Header /> should render null', function() {
      expect(
        renderWithRouter(React.createElement(hopsReact.Header)).toJSON()
      ).toMatchSnapshot();
    });
  });
});
