const path = require('path');

module.exports = {
  workerPath: '<basePath>/sw.js',
  workerFile: path.join(__dirname, 'worker.js'),
  mixins: [__dirname],
  browserWhitelist: {
    workerPath: true,
    locations: true,
  },
  configSchema: {
    workerPath: { type: 'string', minLength: 1 },
    workerFile: { type: 'string', absolutePath: true },
  },
};
