const { withRouter } = require('react-router-dom');
const PropTypes = require('prop-types');

const Miss = ({ staticContext }) => {
  if (staticContext) {
    staticContext.miss = true;
  }

  return null;
};

Miss.propTypes = {
  staticContext: PropTypes.object,
};

exports.Miss = withRouter(Miss);

const Status = ({ staticContext, code }) => {
  if (staticContext) {
    staticContext.status = code;
  }

  return null;
};

Status.propTypes = {
  staticContext: PropTypes.object,
  code: PropTypes.number.isRequired,
};

exports.Status = withRouter(Status);

const Header = ({ staticContext, name = '', value = '' }) => {
  if (staticContext) {
    staticContext.headers = { ...staticContext.headers, [name]: value };
  }

  return null;
};

Header.propTypes = {
  staticContext: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

exports.Header = withRouter(Header);
