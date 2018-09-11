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
