const { resolve } = require('path');
const { loadConfig } = require('../../../loader');

console.log(
  JSON.stringify(loadConfig({ dependencies: { foo: '*' } }, resolve('.')))
);
