function createAstHelper(span = { start: 0, end: 0, ctxt: 0 }) {
  const ast = {
    IdentifierOrExpression: (subject) => {
      if (typeof subject === 'string') {
        return {
          type: 'Identifier',
          span,
          value: subject,
          optional: false,
        };
      } else {
        return subject;
      }
    },
    ObjectExpression: (properties) => {
      return {
        type: 'ObjectExpression',
        span,
        properties: Object.entries(properties).map(([key, value]) => {
          return {
            type: 'KeyValueProperty',
            key: {
              type: 'Identifier',
              span,
              value: key,
              optional: false,
            },
            value,
          };
        }),
      };
    },
    ArrowFunctionExpression: (body) => {
      return {
        type: 'ArrowFunctionExpression',
        span,
        params: [],
        body,
      };
    },
    CallExpression: (callee, ...args) => {
      return {
        type: 'CallExpression',
        span,
        callee: ast.IdentifierOrExpression(callee),
        arguments: args.map((expression) => {
          return {
            spread: null,
            expression,
          };
        }),
        typeArguments: null,
      };
    },
    MemberExpression: (object, property) => {
      return {
        type: 'MemberExpression',
        span,
        object: ast.IdentifierOrExpression(object),
        property: ast.IdentifierOrExpression(property),
        computed: false,
      };
    },
  };

  return ast;
}

module.exports = {
  createAstHelper,
};
