const { render } = require('@untool/core');
const { Header, Miss, Status } = require('./lib/components');

const getEnvironmentVariable = name =>
  process.env[name] || global._hopsEnvironmentVariables
    ? global._hopsEnvironmentVariables[name]
    : undefined;

module.exports = {
  Header,
  Miss,
  Status,
  render,
  getEnvironmentVariable,
};
