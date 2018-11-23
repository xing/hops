const {
  render,
  Header,
  Import,
  Miss,
  Status,
} = require('@untool/react/lib/runtime');
const { Consumer } = require('./server-data/context');
const withServerData = require('./server-data/with-server-data');

const ConfigContext = require('./config/context');
const withConfig = require('./config/with-config');

module.exports = {
  Header,
  Import,
  Miss,
  Status,
  render,
  ServerDataContextConsumer: Consumer,
  withServerData,
  ConfigContext,
  withConfig,
};
