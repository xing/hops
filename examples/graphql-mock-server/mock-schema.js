import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas,
} from 'graphql-tools';

// Mocked chirp schema
const chirpSchema = makeExecutableSchema({
  typeDefs: `
    type Chirp {
      id: ID!
      text: String
      authorId: ID!
    }

    type Query {
      chirpById(id: ID!): Chirp
      chirpsByAuthorId(authorId: ID!): [Chirp]
    }
  `,
});

addMockFunctionsToSchema({ schema: chirpSchema });

// Mocked author schema
const authorSchema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID!
      email: String
    }

    type Query {
      userById(id: ID!): User
    }
  `,
  resolvers: {
    User: {
      email: () => 'email@example.com',
    },
  },
});

addMockFunctionsToSchema({ schema: authorSchema, preserveResolvers: true });

const linkTypeDefs = `
  extend type User {
    chirps: [Chirp]
  }

  extend type Chirp {
    author: User
  }
`;

export default mergeSchemas({
  schemas: [chirpSchema, authorSchema, linkTypeDefs],
  resolvers: {
    User: {
      chirps: {
        fragment: `... on User { id }`,
        resolve(user, args, context, info) {
          return info.mergeInfo.delegateToSchema({
            schema: chirpSchema,
            operation: 'query',
            fieldName: 'chirpsByAuthorId',
            args: {
              authorId: user.id,
            },
            context,
            info,
          });
        },
      },
    },
    Chirp: {
      author: {
        fragment: `... on Chirp { authorId }`,
        resolve(chirp, args, context, info) {
          return info.mergeInfo.delegateToSchema({
            schema: authorSchema,
            operation: 'query',
            fieldName: 'userById',
            args: {
              id: chirp.authorId,
            },
            context,
            info,
          });
        },
      },
    },
  },
});
