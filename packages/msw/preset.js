module.exports = {
  mixins: [__dirname],
  mockServiceWorkerUri: '<basePath>/sw.js',
  mockServiceWorkerHandlersFile: '',
  browserWhitelist: {
    mockServiceWorkerUri: true,
  },
  configSchema: {
    mockServiceWorkerUri: { type: 'string' },
    mockServiceWorkerHandlersFile: {
      type: 'string',
    },
  },
};
