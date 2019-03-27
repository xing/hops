const path = require('path');
module.exports = {
  mixins: [__dirname, path.join(__dirname, 'action-creator-dispatcher')],
  shouldPrefetchOnServer: true,
  configSchema: {
    shouldPrefetchOnServer: { type: 'boolean' },
  },
};
