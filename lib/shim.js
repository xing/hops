
var ReactDOM = require('react-dom');

function render() {
  var mainRender = require('hops-main');
  if (module.hot) {
    mainRender = mainRender.default || mainRender;
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
