
if (global.Object.assign.constructor !== Function) {
  global.Object.assign = require('babel-runtime/core-js/object/assign').default;
}

if (global.Promise.constructor !== Function) {
  global.Promise = require('babel-runtime/core-js/promise').default;
}

var ReactDOM = require('react-dom');

function render() {
  var mainRender = require('hops-main');
  if (mainRender.__esModule) { // eslint-disable-line no-underscore-dangle
    mainRender = mainRender.default;
  }
  var mountPoint = mainRender();
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept(
        require.resolve('hops-main'),
        function () {
          ReactDOM.unmountComponentAtNode(mountPoint);
          setTimeout(render);
        }
      );
    }
  }
}

render();
