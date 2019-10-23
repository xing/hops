const React = require('react');
const ConfigContext = require('./context');

function useConfig() {
  return React.useContext(ConfigContext);
}

module.exports = useConfig;
