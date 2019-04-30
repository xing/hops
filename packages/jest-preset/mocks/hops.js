const hops = require('hops/lib/runtime');
const {
  internal: { runtime },
} = require('untool');
const importComponent = require('../helpers/import-component');

module.exports = Object.assign(hops, runtime, { importComponent });
