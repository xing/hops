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
    include: ['<cacheDir>/**'],
    exclude: ['flow-typed/**', 'typings/**'],
  },
};
