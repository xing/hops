const { loadConfig } = require('../../../loader');

console.log(
  JSON.stringify(loadConfig('namespace', { dependencies: { foo: '*' } }, '.'))
);
