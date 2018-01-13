import ReactRouter from 'react-router';

export const Miss = ReactRouter.withRouter(function Miss(props) {
  if (props.staticContext) {
    props.staticContext.miss = true;
  }
  return null;
});

export const Status = ReactRouter.withRouter(function Status(props) {
  if (props.staticContext) {
    props.staticContext.status = props.code || 200;
  }
  return null;
});

export const Header = withRouter(function Header(props) {
  if (props.staticContext) {
    props.staticContext.headers = props.staticContext.headers || {};
    props.staticContext.headers[props.name] = props.value;
  }
  return null;
});
