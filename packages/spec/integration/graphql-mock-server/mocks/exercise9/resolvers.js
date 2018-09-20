/*
* This example implements cursor-based pagination using Connection, Edge, Node.
* See also: ../index.js and ../../package.json for an example of how to
* configure these custom schema additions and resolvers.
*/
const data = [
  { cursor: '0', node: { id: 1, name: 'Demo1' } },
  { cursor: '1', node: { id: 2, name: 'Demo2' } },
  { cursor: '2', node: { id: 3, name: 'Demo3' } },
  { cursor: '3', node: { id: 4, name: 'Demo4' } },
  { cursor: '4', node: { id: 5, name: 'Demo5' } },
];

module.exports = {
  Query: {
    somethingConnection: (_, { first, after }) => {
      const edges = getSlice(data, first, after);
      const startCursor = (edges[0] || {}).cursor || null;
      const endCursor = (edges[edges.length - 1] || {}).cursor || null;
      const hasNextPage = Boolean(
        endCursor && data[data.findIndex(x => x.cursor === endCursor) + 1]
      );
      const hasPreviousPage = Boolean(
        startCursor && data[data.findIndex(x => x.cursor === startCursor) - 1]
      );

      return {
        edges,
        total: data.length,
        pageInfo: {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor,
        },
      };
    },
  },
};

function getSlice(items, first, after) {
  const startIndex = items.findIndex(x => x.cursor === after);

  return items.slice(startIndex, startIndex + first);
}
