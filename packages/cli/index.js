'use strict';

const {
  render,
  Header,
  Import,
  Miss,
  Status,
  ServerDataContext,
  withServerData,
  ConfigContext,
  withConfig,
} = require('hops-react');

module.exports = {
  get init() {
    return require('./lib/init').init;
  },
  get run() {
    return require('./lib/run').run;
  },
  Header,
  Import,
  Miss,
  Status,
  render,
  ServerDataContext,
  withServerData,
  ConfigContext,
  withConfig,
};
