
var ReactDOM = require('react-dom');

function render() {
  var mainRender = require('hops-main');
  if (mainRender.__esModule) { // eslint-disable-line no-underscore-dangle
    mainRender = mainRender.default;
  }
  var mountPoint = mainRender();
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

render();
