const path = require('path');
module.exports = {
  mixins: [__dirname, path.join(__dirname, 'action-creator-dispatcher')],
  allowServerSideDataFetching: true,
  configSchema: {
    allowServerSideDataFetching: { type: 'boolean' },
  },
};
