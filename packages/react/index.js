const { render } = require('@untool/core');
const { Header, Miss, Status } = require('./lib/components');
const { Consumer } = require('./server-data/context');
const withServerData = require('./server-data/withServerData');

module.exports = {
  Header,
  Miss,
  Status,
  render,
  ServerDataContextConsumer: Consumer,
  withServerData,
};
