import React from 'react';
import { withRouter } from 'react-router-dom';

const Text = withRouter(({ subject, location }) => (
  <>
    <p>Hello lazy {subject}!</p>
    <p>Current pathname: {location.pathname}</p>
  </>
));

export default Text;
