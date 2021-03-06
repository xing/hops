'use strict';

module.exports = ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path) {
      const modules = ['hops-react', this.opts.module];
      const source = path.node.source.value;
      if (!modules.includes(source)) return;

      const specifiers = path.get('specifiers');
      const specifier = specifiers.find(
        (specifier) => specifier.node.imported.name === 'importComponent'
      );
      if (!specifier) return;

      const bindingName = specifier.node.local.name;
      const binding = path.scope.getBinding(bindingName);

      binding.referencePaths.forEach((refPath) => {
        const call = refPath.parentPath;
        t.assertCallExpression(call);

        const argument = call.get('arguments.0');
        if (!argument) {
          throw new Error(
            '"importComponent" must be called with at least one parameter!'
          );
        }

        t.assertArrowFunctionExpression(argument);
        t.assertCallExpression(argument.get('body'));
        t.assertImport(argument.get('body.callee'));

        const { node } = argument.get('body.arguments.0');
        const importedComponent = node.value;
        const leadingComments = node.leadingComments;
        const resourcePathNode = t.stringLiteral(importedComponent);

        argument.replaceWith(
          t.objectExpression([
            t.objectProperty(
              t.identifier('load'),
              t.arrowFunctionExpression(
                [],
                t.callExpression(t.identifier('import'), [
                  t.addComments(resourcePathNode, 'leading', leadingComments),
                ])
              )
            ),
            t.objectProperty(
              t.identifier('moduleId'),
              t.callExpression(
                t.memberExpression(
                  t.identifier('require'),
                  t.identifier('resolveWeak')
                ),
                [resourcePathNode]
              )
            ),
          ])
        );
      });
    },
  },
});

module.exports.path = __filename;
