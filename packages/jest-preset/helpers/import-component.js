/* eslint react/prop-types: 0 */
const React = require('react');

module.exports = ({ component }, name = 'default') => {
  const resolve = typeof name === 'function' ? name : (module) => module[name];

  // eslint-disable-next-line no-unused-vars
  return function Import({ loader, render, ...ownProps }) {
    return React.createElement(resolve(component), ownProps);
  };
};
