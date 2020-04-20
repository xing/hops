const { join } = require('path');

module.exports = {
  mixins: [
    join(__dirname, 'mixins'),
    __dirname,
    join(__dirname, 'server-data'),
    join(__dirname, 'config'),
  ],
};
