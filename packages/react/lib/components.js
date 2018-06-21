const { createElement } = require('react');
const { withRouter } = require('react-router');

exports.withServer = function withServer(WrappedComponent) {
  return withRouter(props =>
    createElement(WrappedComponent, {
      ...props,
      setMiss() {
        props.staticContext && (props.staticContext.miss = true);
      },
      setStatus(code) {
        props.staticContext && (props.staticContext.status = code);
      },
      setHeader(name, value) {
        props.staticContext &&
          (props.staticContext.headers = {
            ...props.staticContext.headers,
            [name]: value,
          });
      },
    })
  );
};

exports.withCLIArguments = function withCLIArguments(WrappedComponent) {
  return props =>
    createElement(WrappedComponent, {
      ...props,
      cliArguments: global._hopsCLIArguments,
    });
};

exports.Miss = exports.withServer(({ setMiss }) => {
  setMiss();
  return null;
});

exports.Status = exports.withServer(({ setStatus, code }) => {
  setStatus(code);
  return null;
});

exports.Header = exports.withServer(({ setHeader, name, value }) => {
  setHeader(name, value);
  return null;
});
