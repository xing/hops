module.exports = {
  Query: {
    somethingConnection: () => {
      return {
        edges: [{ cursor: 1, node: { id: 1, name: 'Demo' } }],
        total: 10,
        pageInfo: {
          endCursor: '1',
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '1',
        },
      };
    },
  },
};
