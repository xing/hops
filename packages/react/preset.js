const { join } = require('path');

module.exports = {
  presets: ['@untool/react'],
  mixins: [
    __dirname,
    join(__dirname, 'server-data'),
    join(__dirname, 'config'),
  ],
};
