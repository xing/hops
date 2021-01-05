import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Miss = withRouter(({ staticContext }) => {
  if (staticContext) {
    staticContext.miss = true;
  }

  return null;
});

Miss.propTypes = {
  staticContext: PropTypes.object,
};

export const Status = withRouter(({ staticContext, code }) => {
  if (staticContext) {
    staticContext.status = code;
  }

  return null;
});

Status.propTypes = {
  staticContext: PropTypes.object,
  code: PropTypes.number.isRequired,
};

export const Header = withRouter(({ staticContext, name = '', value = '' }) => {
  if (staticContext) {
    staticContext.headers = { ...staticContext.headers, [name]: value };
  }

  return null;
});

Header.propTypes = {
  staticContext: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
