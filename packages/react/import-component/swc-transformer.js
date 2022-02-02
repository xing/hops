const { default: Visitor } = require('@swc/core/Visitor');
const { createAstHelper } = require('./swc-ast-helper');

class ImportComponentTransformer extends Visitor {
  visitCallExpression(expression) {
    if (
      expression.callee.type !== 'Identifier' ||
      expression.callee.value !== 'importComponent'
    ) {
      return expression;
    }

    if (
      !Array.isArray(expression.arguments) ||
      expression.arguments.length < 1
    ) {
      throw new Error(
        '"importComponent" must be called with at least one parameter!'
      );
    }

    const [{ expression: argument }, ...otherArguments] = expression.arguments;
    let importValueExpression;

    if (argument.type === 'StringLiteral') {
      importValueExpression = argument;
    } else if (argument.type === 'ArrowFunctionExpression') {
      importValueExpression = argument.body.arguments[0].expression;
    } else {
      return expression;
    }

    const ast = createAstHelper(expression.span);

    return ast.CallExpression(
      'importComponent',
      ast.ObjectExpression({
        load: ast.ArrowFunctionExpression(
          ast.CallExpression('import', importValueExpression)
        ),
        moduleId: ast.CallExpression(
          ast.MemberExpression('require', 'resolveWeak'),
          importValueExpression
        ),
      }),
      ...otherArguments.map(({ expression }) => expression)
    );
  }
}

module.exports = { ImportComponentTransformer };
