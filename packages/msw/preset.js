module.exports = {
  mixins: [__dirname],
  mockServiceWorkerUri: '/sw.js',
  enableMockServiceWorker: '[ENABLE_MSW]',
  browserWhitelist: {
    mockServiceWorkerUri: true,
    enableMockServiceWorker: true,
  },
  configSchema: {
    mockServiceWorkerUri: { type: 'string' },
    enableMockServiceWorker: {
      type: 'string',
      enum: ['true', ''],
    },
  },
};
