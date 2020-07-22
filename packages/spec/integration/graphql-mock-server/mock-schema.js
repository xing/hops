import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { stitchSchemas } from '@graphql-tools/stitch';
import { delegateToSchema } from '@graphql-tools/delegate';

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

const mockedChirpSchema = addMocksToSchema({ schema: chirpSchema });

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

const mockedAuthorSchema = addMocksToSchema({
  schema: authorSchema,
  preserveResolvers: true,
});

const linkTypeDefs = `
  extend type User {
    chirps: [Chirp]
  }

  extend type Chirp {
    author: User
  }
`;

export default stitchSchemas({
  subschemas: [{ schema: mockedChirpSchema }, { schema: mockedAuthorSchema }],
  typeDefs: linkTypeDefs,
  resolvers: {
    User: {
      chirps: {
        selectionSet: `{ id }`,
        resolve(user, args, context, info) {
          return delegateToSchema({
            schema: mockedChirpSchema,
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
        selectionSet: `{ authorId }`,
        resolve(chirp, args, context, info) {
          return delegateToSchema({
            schema: mockedAuthorSchema,
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
