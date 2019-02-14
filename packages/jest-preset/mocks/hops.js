/* eslint node/no-extraneous-require: 0 */
const hops = require('hops/lib/runtime');
const React = require('react');

const importComponent = () =>
  function ImportComponent(props) {
    return React.createElement('ImportComponentStub', props);
  };

module.exports = Object.assign(hops, { importComponent });
