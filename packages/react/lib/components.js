'use strict';

var ReactRouter = require('react-router');

exports.Miss = ReactRouter.withRouter(function Miss (props) {
  if (props.staticContext) {
    props.staticContext.miss = true;
  }
  return null;
});

exports.Status = ReactRouter.withRouter(function Status (props) {
  if (props.staticContext) {
    props.staticContext.status = props.code || 200;
  }
  return null;
});
