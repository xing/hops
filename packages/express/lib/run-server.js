module.exports = function runServer(
  { options, config, hooks, logger },
  callback
) {
  const app = require('./app')(options, config, hooks);
  require('./listen')(app, config, logger, callback);
};
