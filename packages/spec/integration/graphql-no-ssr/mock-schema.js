import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Subject {
    id: ID!
    title: String
  }

  type Query {
    subject: Subject
  }
`;

let count = 0;

const resolvers = {
  Query: {
    subject: () => ({
      id: 'abc.123',
      title: `Fetch No. ${++count}`,
    }),
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
