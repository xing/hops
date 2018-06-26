const { render } = require('@untool/core');
const { Header, Miss, Status } = require('./lib/components');
const { Consumer } = require('./server-data/context');
const withServerData = require('./server-data/withServerData');

const getEnvironmentVariable = name =>
  process.env[name] || global._hopsEnvironmentVariables
    ? global._hopsEnvironmentVariables[name]
    : undefined;

module.exports = {
  Header,
  Miss,
  Status,
  render,
  ServerDataContextConsumer: Consumer,
  withServerData,
  getEnvironmentVariable,
};
