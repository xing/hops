const { define, sync, async: asyncHooks } = require('mixinable');

const { callable, sequence } = sync;

const strategies = {
  validateConfig: callable,
  detectDuplicatePackages: callable,
  collectResults: callable,
  pushWarning: callable,
  pushError: callable,
  logResults: sequence,
  setMode: callable,
  getMode: asyncHooks.callable,
};

const mixins = [
  require('./validators/config'),
  require('./validators/duplicates'),
  require('./validators/generic'),
];

exports.createDoctor = define(strategies, mixins);
