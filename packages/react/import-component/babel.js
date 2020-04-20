'use strict';

const deprecate = require('depd')('hops-react');

module.exports = ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path) {
      const modules = ['hops-react', 'untool', this.opts.module];
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

        let importedComponent;

        if (t.isStringLiteral(argument)) {
          importedComponent = argument.node.value;
          deprecate(
            '[DEP001] Using a string as loader for `importComponent` is deprecated and will be removed in a future major release (https://github.com/untool/untool/blob/master/DEPRECATIONS.md).'
          );
        } else {
          t.assertArrowFunctionExpression(argument);
          t.assertCallExpression(argument.get('body'));
          t.assertImport(argument.get('body.callee'));

          importedComponent = argument.get('body.arguments.0').node.value;
        }

        argument.replaceWith(
          t.objectExpression([
            t.objectProperty(
              t.identifier('load'),
              t.arrowFunctionExpression(
                [],
                t.callExpression(t.identifier('import'), [
                  t.stringLiteral(importedComponent),
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
                [t.stringLiteral(importedComponent)]
              )
            ),
          ])
        );
      });
    },
  },
});

module.exports.path = __filename;
