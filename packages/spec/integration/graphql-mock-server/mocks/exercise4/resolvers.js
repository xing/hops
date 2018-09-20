/**
 * This example demonstrates how to implement custom scalar types and define
 * corresponding resolvers for them.
 * See also: ../index.js and ../../package.json for an example of how to
 * configure these custom schema additions and resolvers.
 */

module.exports = {
  MyDate: {
    __serialize(date) {
      return date.toISOString();
    },
    __parseValue(value) {
      return new Date(value);
    },
    __parseLiteral(ast) {
      return ast.value;
    },
  },
  Query: {
    myDates: () => [
      new Date('2018-08-31T12:23:18.530Z'),
      new Date('2018-07-31T12:23:18.530Z'),
    ],
  },
};
