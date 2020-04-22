const { join } = require('path');

module.exports = {
  mixins: [
    join(__dirname, 'build'),
    join(__dirname, 'render'),
    join(__dirname, 'router'),
    join(__dirname, 'helmet'),
    join(__dirname, 'import-component'),
    join(__dirname, 'server-data'),
    join(__dirname, 'config'),
  ],
};
