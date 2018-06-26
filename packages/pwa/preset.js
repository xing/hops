const path = require('path');

module.exports = {
  workerPath: '<basePath>/sw.js',
  workerFile: path.join(__dirname, 'worker.js'),
  mixins: [__dirname],
};
