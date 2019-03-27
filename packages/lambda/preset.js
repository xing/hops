const path = require('path');

module.exports = {
  mixins: [__dirname],
  aws: {
    memorySize: 128,
    region: 'us-east-1',
    domainName: '',
    certificateArn: '',
    stageName: 'prod',
    uniqueName: 'hops-lambda-<name>',
    cloudformationTemplateFile: path.resolve(__dirname, 'cloudformation.yaml'),
    include: ['<serverDir>/**'],
    exclude: ['flow-typed/**', 'typings/**'],
  },
  configSchema: {
    aws: {
      memorySize: { type: 'number' },
      region: { type: 'string', minLength: 1 },
      domainName: { type: 'string', format: 'hostname' },
      certificateArn: { type: 'string' },
      stageName: { type: 'string', minLength: 1 },
      uniqueName: { type: 'string', minLength: 1 },
      cloudformationTemplateFile: { type: 'string', absolutePath: true },
      include: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      exclude: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
};
