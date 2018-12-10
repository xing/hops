const {
  render,
  Header,
  importComponent,
  Miss,
  Status,
} = require('@untool/react/lib/runtime');
const ServerDataContext = require('./server-data/context');
const withServerData = require('./server-data/with-server-data');

const ConfigContext = require('./config/context');
const withConfig = require('./config/with-config');

module.exports = {
  Header,
  importComponent,
  Miss,
  Status,
  render,
  ServerDataContext,
  withServerData,
  ConfigContext,
  withConfig,
};
