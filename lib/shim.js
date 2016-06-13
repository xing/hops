
var ReactDOM = require('react-dom');

function render() {
  var mainRender = require('hops-main');
  if (module.hot) {
    if (mainRender.__esModule) { // eslint-disable-line no-underscore-dangle
      mainRender = mainRender.default;
    }
    var mountPoint = mainRender(true);
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
