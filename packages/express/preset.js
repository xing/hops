module.exports = {
  https: false,
  keyFile: '',
  certFile: '',
  host: '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || undefined,
  locations: [],
  basePath: '',
  assetPath: '',
  enableServerTimings: true,
  env: {
    production: {
      compress: true,
    },
  },
  mixins: [__dirname],
};
