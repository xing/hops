const React = require('react');
const ServerDataContext = require('./context');

function useServerData() {
  return React.useContext(ServerDataContext);
}

module.exports = useServerData;
