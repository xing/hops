import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello world.',
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
