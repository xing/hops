const { render } = require('@untool/core');
const { Header, Miss, Status, withCLIArguments } = require('./lib/components');

const getEnvironmentVariable = name => global._hopsEnvironmentVariables[name];

module.exports = {
  Header,
  Miss,
  Status,
  render,
  withCLIArguments,
  getEnvironmentVariable,
};
