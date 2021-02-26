import { withRouter } from 'react-router-dom';

export const Miss = withRouter(({ staticContext }) => {
  if (staticContext) {
    staticContext.miss = true;
  }

  return null;
});

export const Status = withRouter(({ staticContext, code }) => {
  if (staticContext) {
    staticContext.status = code;
  }

  return null;
});

export const Header = withRouter(({ staticContext, name = '', value = '' }) => {
  if (staticContext) {
    staticContext.headers = { ...staticContext.headers, [name]: value };
  }

  return null;
});
