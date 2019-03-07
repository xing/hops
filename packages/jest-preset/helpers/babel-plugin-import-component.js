/**
 * Babel-plugin for enabling the synchronous import
 * of components in the Jest environment.
 *
 * Compiles `importComponent` calls like...
 *
 * ```javascript
 * importComponent('./test');
 * importComponent(() => import('./another-test'));
 * ```
 *
 * ...to ones where the `require`-call is inserted.
 *
 * ```javascript
 * importComponent({ component: require('./test') });
 * importComponent({ component: require('./another-test') });
 * ```
 *
 * The optional second argument of `importComponent` is left
 * untouched as in @untool/react/lib/babel.
 */
module.exports = ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path) {
      const specifiers = path.get('specifiers');
      const specifier = specifiers.find(
        specifier =>
          specifier.node.imported &&
          specifier.node.imported.name === 'importComponent'
      );
      if (!specifier) return;

      const bindingName = specifier.node.local.name;
      const binding = path.scope.getBinding(bindingName);

      binding.referencePaths.forEach(refPath => {
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
        } else {
          t.assertArrowFunctionExpression(argument);
          t.assertCallExpression(argument.get('body'));
          t.assertImport(argument.get('body.callee'));

          importedComponent = argument.get('body.arguments.0').node.value;
        }

        argument.replaceWith(
          t.objectExpression([
            t.objectProperty(
              t.identifier('component'),
              t.callExpression(t.identifier('require'), [
                t.stringLiteral(importedComponent),
              ])
            ),
          ])
        );
      });
    },
  },
});
