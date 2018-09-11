module.exports = {
  remoteSchemas: [
    {
      url: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
      },
    },
  ],
  schemaMocks: [
    './mocks/github',
    './mocks/exercise1',
    './mocks/exercise2',
    './mocks/exercise3',
    './mocks/exercise4',
    './mocks/exercise5',
    './mocks/exercise6',
    './mocks/exercise7',
    './mocks/exercise8',
    './mocks/exercise9',
  ],
};
